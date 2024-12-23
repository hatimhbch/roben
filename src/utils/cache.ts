export const REVALIDATE_TIME = 60 * 60; // 1 hour in seconds

export async function getCachedData(key: string, fetchFn: () => Promise<any>) {
  const cache = await caches.open('post-cache');
  const cached = await cache.match(key);

  if (cached) {
    const data = await cached.json();
    const now = Date.now();
    if (now - data.timestamp < REVALIDATE_TIME * 1000) {
      return data.value;
    }
  }

  const fresh = await fetchFn();
  const response = new Response(JSON.stringify({
    value: fresh,
    timestamp: Date.now()
  }));
  await cache.put(key, response);
  return fresh;
}