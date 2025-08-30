// instrumentation-client.ts
// This file configures the initialization of Sentry on the client.
// Docs: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://adf91265c0942bebbe1d82407370af5c@o4509927490060288.ingest.us.sentry.io/4509927493664768",

  // ✅ merge replay + feedback + other integrations
  integrations: [
    Sentry.replayIntegration(),
    Sentry.feedbackIntegration({
      colorScheme: "system",
    }),
  ],

  tracesSampleRate: 1.0,       // adjust for production
  enableLogs: true,            // send console logs
  replaysSessionSampleRate: 0.1, // 10% of sessions get replay
  replaysOnErrorSampleRate: 1.0, // 100% when error occurs
  debug: false,
});

// Optional export for routing transitions (keeps tracking page navigations)
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
