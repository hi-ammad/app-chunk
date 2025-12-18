import mongoose from "mongoose";
import RedisCache from "@/library/redis";

/**  INFO: EXPORT - ENHANCE_QUERY_WD_CACHE_FUNCTIONALITY */
export const enhanceQueryWithCache = async () => {
  const exec = mongoose.Query.prototype.exec;
  /* CACHE_FUNCTION */
  mongoose.Query.prototype.cache = function (options: any = {}) {
    this.useCache = true; // To Turn the cache off/on
    this.hashKey = JSON.stringify(options.key || "");
    return this;
  };

  /*  INFO: ENHANCE_EXEC_FUNCTION */
  mongoose.Query.prototype.exec = async function () {
    /*  INFO: SHOULD_WE_APPLY_CACHE_OR_NOT */
    if (!this.useCache) {
      return exec.apply(this);
    }

    /*  INFO: CREATING_CACHE_KEY */
    const key = JSON.stringify({
      collection: this.model.modelName,
      query: JSON.parse(this.getOptions().comment),
    });

    /*  INFO: SEE_IF_WE_HAVE_A_VALUE_FOR_'KEY'_IN_REDIS */
    const cacheValue = await RedisCache.instance.client.json.get(key);

    /*  INFO: IF_WE_DO_RETURN_THAT */
    if (cacheValue) {
      this.isCached = true;
      return cacheValue;
    } this.isCached = false;

    /*  INFO: OTHERWISE, ISSUE_THE_QUERY_AND_STORE_THE_RESULT_IN_REDIS */
    const result = await exec.apply(this);
    RedisCache.instance.client.json.set(key, "$", result);

    return result;
  };
};

/**
 *  INFO: Clears a cache entry associated with the provided hash key.
 * @param {string} hashKey - The key of the hash entry to be cleared from the cache.
 * @returns {void} This function does not return anything.
 * @example
 * ```typescript
 * clearHash('myHashKey');
 * // Clears the cache entry associated with the hash key 'myHashKey'.
 * ```
 */
export const clearHash = (hashKey: string): undefined => {
  RedisCache.instance.client.del(JSON.stringify(hashKey));
};
