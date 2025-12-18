import Redis from 'ioredis';
import type { Request, Response, NextFunction, Handler } from 'express'
import RedisCache from '@/library/redis';

const TOO_MANY_REQUESTS = 429;

interface ILimiterOptions {
  keyNamespace: string;
  limitResHeader: string;
  refillRatePerSec: number;
  bucketCapacity: number;
  tokenCost: number;
  idleTimeout: number | false;
}

export function rateLimit(opts: Partial<ILimiterOptions> = {}): Handler {
  const {
    keyNamespace = 'api/rate-limit',
    limitResHeader = 'X-Retry-After',
    refillRatePerSec = 2,
    bucketCapacity = 100,
    tokenCost = 1,
    // delete the associated bucket after 3 hours of inactivity
    idleTimeout = 60 * 60 * 3,
  } = opts;

  return async ({ ip, path }: Request, res: Response, next: NextFunction) => {
    const limitKey = `${keyNamespace}:${ip}:${path}`;
    // retrieving the limit data from a specific hash
    const { tokensCount, lastRefill } = await RedisCache.instance.client.hGetAll(limitKey);

    // how many tokens there are in a bucket currently
    const tokensInBucket = !tokensCount ? bucketCapacity : +tokensCount;
    // how many seconds passed since the last bucket refill
    const lastRefillTime = lastRefill ? +lastRefill : 0;

    // calculating the Unix Timestamp (amount of secs since Epoch)
    const currentTimestampSecs = Math.floor(Date.now() / 1000);
    // time in seconds from the last refill; 0 means no refill was yet issued
    const secsSinceRefill = Math.max(0, currentTimestampSecs - lastRefillTime);

    // most recent refill * tokens/min
    const tokensToReplenish = Math.floor(secsSinceRefill * refillRatePerSec);
    // replenishing tokens up to a certain threshold; Ex: Max(500, 450 + 100)
    const replenishedTokenAmount = Math.min(
      bucketCapacity,
      tokensInBucket + tokensToReplenish,
    );

    if (replenishedTokenAmount === 0) {
      const retryAfter = Math.ceil(tokenCost / refillRatePerSec);
      // how many refills (seconds) are required to make another request
      res.setHeader(limitResHeader, retryAfter);

      return res.status(TOO_MANY_REQUESTS).send({
        message: `Too many requests! Please try again in ${retryAfter} seconds.`,
      });
    }

    // how many requests may be made in total before the bucket becomes empty
    res.setHeader('X-RateLimit-Limit', Math.floor(bucketCapacity / tokenCost));
    // how many future requests may be made before the bucket becomes empty
    res.setHeader('X-RateLimit-Remaining', replenishedTokenAmount);

    // Updating the current points count (replenished) and last refill time
    await RedisCache.instance.client.hSet(limitKey, {
      tokensCount: replenishedTokenAmount - tokenCost,
      lastRefill: currentTimestampSecs,
    });

    if (idleTimeout) {
      await RedisCache.instance.client.expire(limitKey, idleTimeout);
    }
    next();
  };
}
