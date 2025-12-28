const cache = new Map();

export function getCache(key, ttlMs) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.time > ttlMs) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

export function setCache(key, value) {
  cache.set(key, {
    value,
    time: Date.now()
  });
}
