"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  retryCount: number;
}

/**
 * Auto-recovery ErrorBoundary for the app layout.
 * When "Rendered more hooks" or similar invariant errors occur
 * (e.g., during token refresh + RSC streaming race conditions),
 * this boundary catches the error and auto-refreshes the page
 * instead of showing the ugly Next.js crash page.
 *
 * - First error: auto-refresh the page (fixes stale state)
 * - Second error within same session: show error UI with manual refresh button
 */
const MAX_AUTO_RETRIES = 1;
const RETRY_STORAGE_KEY = "auto-recovery-boundary-retry-count";

export class AutoRecoveryBoundary extends Component<Props, State> {
  private clearRetryTimeout: number | null = null;

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      retryCount: typeof window === "undefined" ? 0 : Number(sessionStorage.getItem(RETRY_STORAGE_KEY) ?? "0"),
    };
  }

  componentDidMount() {
    if (!this.state.hasError && this.state.retryCount > 0) {
      // Keep the retry marker briefly after mount so post-mount crashes
      // fall back instead of entering a reload loop.
      this.clearRetryTimeout = window.setTimeout(() => {
        sessionStorage.removeItem(RETRY_STORAGE_KEY);
        this.setState({ retryCount: 0 });
      }, 3000);
    }
  }

  componentWillUnmount() {
    if (this.clearRetryTimeout !== null) {
      window.clearTimeout(this.clearRetryTimeout);
    }
  }

  static getDerivedStateFromError(): Partial<State> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("AutoRecoveryBoundary caught error:", error, {
      componentStack: errorInfo.componentStack,
      retryCount: this.state.retryCount,
    });

    // Auto-refresh on first error — this fixes stale auth/RSC state
    if (this.state.retryCount < MAX_AUTO_RETRIES) {
      const nextRetryCount = this.state.retryCount + 1;
      sessionStorage.setItem(RETRY_STORAGE_KEY, String(nextRetryCount));
      this.setState({ retryCount: nextRetryCount });
      window.location.reload();
    }
  }

  render() {
    if (this.state.hasError && this.state.retryCount >= MAX_AUTO_RETRIES) {
      // Fallback UI after auto-retry exhausted
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to bottom, #fff7ed, #fef3c7)",
            padding: "24px",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ maxWidth: "400px", textAlign: "center" }}>
            <div style={{ fontSize: "80px", marginBottom: "16px" }}>🦉</div>
            <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#ea580c", marginBottom: "12px" }}>
              Ôi! Có lỗi xảy ra rồi!
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>Đừng lo, hãy thử tải lại trang nhé!</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "12px 32px",
                borderRadius: "9999px",
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                background: "linear-gradient(to bottom, #fb923c, #ea580c)",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 6px 0 #9a3412, 0 10px 20px rgba(0,0,0,0.25)",
              }}
            >
              Tải lại trang
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
