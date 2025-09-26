/** @format */

import { driveGetFileReadable } from "@/lib/googleServer";
export const runtime = "nodejs";

export async function GET(_req: Request, { params }: { params: Promise<{ fileId: string }> }) {
  const { fileId } = await params;
  try {
    const { stream, headers } = await driveGetFileReadable(fileId);
    const h = new Headers();
    h.set("content-type", (headers["content-type"] as string) || "application/octet-stream");
    h.set("cache-control", "private, max-age=60");
    return new Response(stream as any, { headers: h });
  } catch (e: any) {
    const status = e?.response?.status || 404;
    const body = e?.response?.data ? JSON.stringify(e.response.data) : String(e);
    return new Response(`Not found: ${body}`, { status });
  }
}
