import mongoose from "mongoose";
import { Constant } from "@/constants";
import { winsLogger } from "@/library/logger";
import App from "@/app";
import RedisCache from "@/library/redis";
import { enhanceQueryWithCache } from "@/cache";
import * as Sentry from "@sentry/node";

mongoose.connect(Constant.instance.db.url).then(async () => {
  winsLogger.info("DB_CONNECTED_SUCCESSFULLY...",);
  Sentry.logger.info("DB_CONNECTED_SUCCESSFULLY...");
  RedisCache.instance.initialize();
  enhanceQueryWithCache();
});

const { port } = Constant.instance.server;
const server = App.instance.app.listen(port, () => {
  winsLogger.info(`API_SERVER_IS_LISTENING_ON_PORT: ${port}`)
  Sentry.logger.info(`API_SERVER_IS_LISTENING_ON_PORT: ${port}`)
});

process.on('unhandledRejection', (err: Error) => {
  winsLogger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  winsLogger.error(err.name, err.message);
  Sentry.captureException(err);
  Sentry.captureMessage('UNHANDLED REJECTION! 💥 Shutting down...', 'error');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  winsLogger.error('👋 SIGTERM RECEIVED. Shutting down gracefully');
  Sentry.captureMessage('👋 SIGTERM RECEIVED. Shutting down gracefully', 'error');
  server.close(() => {
    console.log('💥 Process terminated!');
    Sentry.captureMessage('💥 Process terminated!', 'error');
  });
});
