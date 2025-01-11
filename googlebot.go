package main

// middleware implementation to check if the incoming request is a google search engine crawler
// if the request is from a crawler, write a rendered html for the request, otherwise, continue to next
// handler

// todo: loggaa filuun kun palautetaan renderöity html
// todo: testaa chromedp miten toimii react routterin kanssa
// todo: muuta responseHTML mapiksi, <url, html>
// https://www.bing.com/toolbox/bingbot.json

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"log/slog"
	"net"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/chromedp/chromedp"
)

const googleBotIPRangeURL = "https://developers.google.com/static/search/apis/ipranges/googlebot.json"

// Cache for Googlebot IP ranges
var GoogleBotIPCache = struct {
	ranges []string
	mu     sync.RWMutex
}{}
var ResponseHTML string

func checkGooglebot(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if ResponseHTML != "" {
			clientIP := getClientIP(r)
			if clientIP != "" {
				userAgent := r.Header.Get("User-Agent")
				if strings.Contains(userAgent, "Googlebot") && isIPInGooglebotRanges(clientIP) {
					slog.Info("sending rendered html to search engine bot")
					slog.Info(ResponseHTML)
					w.Header().Set("Content-Type", "text/html")
					w.WriteHeader(http.StatusOK)
					w.Write([]byte(ResponseHTML))
					return
				}
			}
		}

		next.ServeHTTP(w, r)
	})
}

func startIPRangeUpdater(exitguard *sync.WaitGroup, ctx context.Context) {
	exitguard.Add(1)
	go func() {
		defer exitguard.Done()
		for {
			select {
			case <-ctx.Done():
				slog.Info("closing googlebot ip range updater")
				return
			case <-time.After(24 * time.Hour):
				if err := fetchGooglebotIPRanges(); err != nil {
					slog.Error("failed to update googlebot ip ranges", "error", err)
				}
			}
		}
	}()

	go func() {
		timeoutCtx, cancel := context.WithTimeout(ctx, 30*time.Second)
		defer cancel()

		for ResponseHTML == "" {
			select {
			case <-timeoutCtx.Done():
				slog.Error("timed out while attempting to pre render page")
				return
			default:
				slog.Info("attempting to pre render single page application")
				preRenderPage()
			}
		}
	}()
}

func fetchGooglebotIPRanges() error {
	resp, err := http.Get(googleBotIPRangeURL)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return errors.New("failed to fetch search engine bot IP ranges")
	}

	// Parse the JSON response
	var data struct {
		Prefixes []struct {
			IPv4Prefix string `json:"ipv4Prefix"`
			IPv6Prefix string `json:"ipv6Prefix"`
		} `json:"prefixes"`
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(body, &data); err != nil {
		return err
	}

	// Update the IP cache
	var ranges []string
	for _, prefix := range data.Prefixes {
		if prefix.IPv4Prefix != "" {
			ranges = append(ranges, prefix.IPv4Prefix)
		}
		if prefix.IPv6Prefix != "" {
			ranges = append(ranges, prefix.IPv6Prefix)
		}
	}

	GoogleBotIPCache.mu.Lock()
	GoogleBotIPCache.ranges = ranges
	GoogleBotIPCache.mu.Unlock()

	return nil
}

// Check if an IP is within Googlebot ranges
func isIPInGooglebotRanges(ip string) bool {
	parsedIP := net.ParseIP(strings.Split(ip, "/")[0])
	if parsedIP == nil {
		return false
	}

	GoogleBotIPCache.mu.RLock()
	ips := GoogleBotIPCache.ranges
	GoogleBotIPCache.mu.RUnlock()

	for _, cidr := range ips {
		_, ipNet, err := net.ParseCIDR(cidr)
		if err != nil {
			continue
		}
		if ipNet.Contains(parsedIP) {
			return true
		}
	}
	return false
}

// Helper function to get the client's IP address
func getClientIP(r *http.Request) string {
	// Check for the X-Forwarded-For header (use the first IP in the list)
	xff := r.Header.Get("X-Forwarded-For")
	if xff != "" {
		ips := strings.Split(xff, ",")
		return strings.TrimSpace(ips[0])
	}

	// Fallback to remote address
	host := r.RemoteAddr

	_, ipNet, err := net.ParseCIDR(host)
	if err != nil {
		slog.Error("could not parse ip", "error", err.Error())
		return ""
	}

	ret := ipNet.String()
	return ret
}

func preRenderPage() {
	ctx, cancel := chromedp.NewContext(context.Background())
	defer cancel()

	err := chromedp.Run(ctx,
		chromedp.Navigate("http://127.0.0.1"+Port+"/"),
		chromedp.InnerHTML("html", &ResponseHTML, chromedp.NodeVisible, chromedp.ByQuery),
	)
	if err != nil {
		slog.ErrorContext(ctx, err.Error())
		return
	}
}
