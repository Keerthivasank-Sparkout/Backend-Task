const cacheStore = new Map();

const get = (key) => {
  const cached = cacheStore.get(key);

  if (!cached) {
    return null;
  }

  if (Date.now() > cached.expiresAt) {
    cacheStore.delete(key);
    return null;
  }

  return cached.value;
};

const set = (key, value, ttlInMs) => {
  cacheStore.set(key, {
    value,
    expiresAt: Date.now() + ttlInMs,
  });
};

const getOrSet = async (key, ttlInMs, fetcher) => {
  const cachedValue = get(key);

  if (cachedValue) {
    return {
      data: cachedValue,
      meta: { source: "cache", cached: true, ttlInMs },
    };
  }

  const freshValue = await fetcher();
  set(key, freshValue, ttlInMs);

  return {
    data: freshValue,
    meta: { source: "api", cached: false, ttlInMs },
  };
};

const size = () => cacheStore.size;

setInterval(() => {
  const now = Date.now();

  for (const [key, value] of cacheStore.entries()) {
    if (now > value.expiresAt) {
      cacheStore.delete(key);
    }
  }
}, 60 * 1000).unref();

module.exports = {
  get,
  set,
  getOrSet,
  size,
};
