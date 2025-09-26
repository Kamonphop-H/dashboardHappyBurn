/** @format */

export async function withErrorHandler<T>(fn: () => Promise<T>) {
  try {
    return await fn();
  } catch (e: any) {
    const status = e?.response?.status || 500;
    const message = e?.response?.data?.error?.message || e?.message || "Unknown error";
    return new Response(JSON.stringify({ error: { message, status } }), {
      status,
      headers: { "content-type": "application/json" },
    });
  }
}
