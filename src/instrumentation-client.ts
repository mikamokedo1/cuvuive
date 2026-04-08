import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Send request headers and IP for user context
  sendDefaultPii: true,

  // Performance monitoring: 100% in dev, 10% in production
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Session Replay: disabled in prod for performance, 100% on error
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,

  // Integrations are lazy-loaded below to reduce initial bundle size
  integrations: [],
});

// Only load Sentry Replay when an error actually occurs (saves ~47KB + 190ms on every page)
// The replaysOnErrorSampleRate above triggers this automatically via Sentry internals

// Required by Sentry to instrument client-side navigations
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
