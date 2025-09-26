/** @format */

import { sheetsGetValues, SHEET_LOGS_RANGE } from "@/lib/googleServer";
export const runtime = "nodejs";
export async function GET() {
  const t0 = Date.now();
  const rows = (await sheetsGetValues(SHEET_LOGS_RANGE)).values?.length || 0;
  return new Response(JSON.stringify({ sheets_rows: rows, latency_ms: Date.now() - t0 }), {
    headers: { "content-type": "application/json" },
  });
}
