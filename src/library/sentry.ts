// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import { Constant } from "@/constants";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: Constant.instance.sentry.dsn,
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  attachStacktrace: true,
  release: `...@/api/v1`,
  // Capture 25% of all transactions
  tracesSampleRate: 0.25,
  enableLogs: true,
});
