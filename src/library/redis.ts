import { createClient, type RedisClientType } from "redis";
import { Constant } from "@/constants";
import { winsLogger } from "./logger";

/*
 * Singleton Class For Managing a Redis Cache Instance.
 *
 * This class provides a singleton instance of a Redis client configured
 * with connection details from the application's constants. It initializes
 * the Redis client upon instantiation and logs initialization status.
 */
export default class RedisCache {
  private static _instance: RedisCache;
  readonly client: RedisClientType;

  /*
   * Private constructor initializes the Redis client using connection details
   * from the application's constants.
   */
  private constructor() {
    if (Constant.instance.server.nodeEnv === 'test') this.client = createClient();
    else {
      const { password, port, host } = Constant.instance.redis;

      this.client = createClient({
        password,
        socket: {
          host,
          port: +port,
        },
      });
    }
  }

  /*
   * Initializes the Redis client connection asynchronously.
   * Logs success or failure during Redis initialization.
   */
  async initialize() {
    try {
      await this.client
        .connect()
      winsLogger.info("REDIS_INITIALIZED_SUCCESSFULLY.");
    } catch (error) {
      winsLogger.error("Error during Redis Initialization:", error)
    }
  }

  /*
   * Static method to retrieve the singleton instance of RedisCache.
   *
   * If an instance already exists, returns it; otherwise, creates a new instance.
   *
   * @returns The singleton instance of RedisCache.
   */
  static get instance(): RedisCache {
    if (RedisCache._instance != null) return RedisCache._instance;
    this._instance = new RedisCache();
    return RedisCache._instance;
  }
}
