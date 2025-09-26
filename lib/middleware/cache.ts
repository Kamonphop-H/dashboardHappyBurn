/** @format */

// lib/middleware/cache.ts
import { LRUCache } from "lru-cache"; // ⬅ เปลี่ยนเป็น named export

// ประกาศ cache instance
const cache = new LRUCache<string, { ts: number; data: any }>({
  max: 500,
});

export async function withCache<T>(key: string, fn: () => Promise<T>, ttlSec = 60): Promise<Response> {
  const hit = cache.get(key);
  const now = Date.now();

  if (hit && now - hit.ts < ttlSec * 1000) {
    return new Response(JSON.stringify(hit.data), {
      headers: {
        "content-type": "application/json",
        "x-cache": "HIT",
      },
    });
  }

  const data = await fn();
  cache.set(key, { ts: now, data });

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
      "x-cache": "MISS",
    },
  });
}
