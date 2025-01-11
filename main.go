package main

import (
	"context"
	"log/slog"
	"mime"
	"net"
	"net/http"
	"os"
	"os/signal"
	"sync"
	"syscall"
	"time"
)

var RenderedHTML = ""
var Port = ":80"
var Address = "" + Port

var applicationMainContext context.Context
var mainAppCtxCancel context.CancelFunc

func main() {
	var exitGuard = sync.WaitGroup{}

	applicationMainContext, mainAppCtxCancel = context.WithCancel(context.Background())
	defer mainAppCtxCancel()

	handleSig()
	mimes()

	fs := http.FileServer(http.Dir("static/"))
	mux := http.NewServeMux()
	mux.Handle("/", fs)

	var handler http.Handler = mux
	handler = checkGooglebot(handler)

	server := &http.Server{
		Addr:    Address,
		Handler: handler,
	}

	ln, err := net.Listen("tcp", Address)
	if err != nil {
		slog.Error("error starting listener", "error", err)
		return
	}

	exitGuard.Add(1)
	go func() {
		defer exitGuard.Done()
		slog.Info("starting http server")
		if err := server.Serve(ln); err != nil {
			slog.Error(err.Error())
		}
	}()

	exitGuard.Add(1)
	go func() {
		defer exitGuard.Done()
		<-applicationMainContext.Done()
		slog.Info("shutting down http server")
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		if err := server.Shutdown(shutdownCtx); err != nil {
			slog.Error("server shutdown failed", "error", err.Error())
		}
	}()

	if err := fetchGooglebotIPRanges(); err != nil {
		slog.Error("Failed to fetch initial Googlebot IP ranges", "error", err)
	}
	startIPRangeUpdater(&exitGuard, applicationMainContext)

	exitGuard.Wait()
	slog.Info("all processes complete")
	slog.Info("shutting down")
}

func mimes() {
	mime.AddExtensionType(".js", "text/javascript")
	mime.AddExtensionType(".css", "text/css")
	mime.AddExtensionType(".html", "text/html")
}

func handleSig() {
	signalCh := make(chan os.Signal, 1)
	signal.Notify(signalCh, syscall.SIGTERM, syscall.SIGINT)

	go func() {
		<-signalCh
		slog.Info("sig term called")
		slog.Info("canceling main app context")
		mainAppCtxCancel()
	}()
}

func isMainContextAlive() bool {
	return applicationMainContext.Err() == nil
}
