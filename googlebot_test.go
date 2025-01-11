package main

import (
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

func setup(t *testing.T) http.Handler {
	if err := fetchGooglebotIPRanges(); err != nil {
		t.Errorf("failed to fetch googlebot ips\n\t%s", err.Error())
	}
	ResponseHTML = "rendered html"

	return checkGooglebot(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("Not Googlebot"))
	}))
}

func Test_checkGooglebot_getsrenderedhtml(t *testing.T) {
	handler := setup(t)

	// Simulate a Googlebot request
	resp, err := simulateGooglebotRequest(handler)
	if err != nil {
		t.Fatalf("Failed to simulate request: %v", err)
	}

	// Check the response
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status 200, got %d", resp.StatusCode)
	}

	// Read the response body using io.ReadAll
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Errorf("Failed to read response body: %v", err)
	}

	if string(body) != ResponseHTML {
		t.Errorf("Expected body to be %s, got: %s", ResponseHTML, string(body))
	}

	t.Logf("Response: %s", body)
}

func simulateGooglebotRequest(handler http.Handler) (*http.Response, error) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Googlebot/2.1 (+http://www.google.com/bot.html)")
	req.RemoteAddr = GoogleBotIPCache.ranges[0]
	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)
	return rr.Result(), nil
}

func Test_checkGooglebot_doesnotgetrenderedhtml(t *testing.T) {
	handler := setup(t)

	// Simulate a Googlebot request
	resp, err := simulateRegularRequest(handler)
	if err != nil {
		t.Fatalf("Failed to simulate request: %v", err)
	}

	// Check the response
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status 200, got %d", resp.StatusCode)
	}

	// Read the response body using io.ReadAll
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		t.Errorf("Failed to read response body: %v", err)
	}

	if string(body) == ResponseHTML {
		t.Errorf("Expected body to be %s, got: %s", ResponseHTML, string(body))
	}

	t.Logf("Response: %s", body)
}

func simulateRegularRequest(handler http.Handler) (*http.Response, error) {
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Firefox/91.0")
	req.RemoteAddr = "192.32.5.3/13"
	rr := httptest.NewRecorder()
	handler.ServeHTTP(rr, req)
	return rr.Result(), nil
}
