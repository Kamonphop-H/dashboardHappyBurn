/** @format */

import { sheetsGetValuesSafe, toObjects, SHEET_FLAGS_RANGE } from "@/lib/googleServer";
export const runtime = "nodejs";
export async function GET() {
  const flags = toObjects((await sheetsGetValuesSafe(SHEET_FLAGS_RANGE)).values || []);
  return new Response(JSON.stringify({ items: flags.slice(-500).reverse() }), {
    headers: { "content-type": "application/json" },
  });
}
