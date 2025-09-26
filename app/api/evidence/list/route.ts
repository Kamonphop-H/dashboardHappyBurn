/** @format */

import { NextRequest } from "next/server";
import { sheetsGetValues, toObjects, SHEET_LOGS_RANGE } from "@/lib/googleServer";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get("from") || "1900-01-01";
  const to = req.nextUrl.searchParams.get("to") || "2999-12-31";
  const logs = toObjects((await sheetsGetValues(SHEET_LOGS_RANGE)).values || []);
  const items = logs
    .filter((x) => {
      const d = String(x.created_at || x.date || "").slice(0, 10);
      return d >= from && d <= to && (x.photo_file_id || x.photo_url);
    })
    .map((x) => ({
      employee_id: x.employee_id,
      log_date: x.date,
      photo_file_id: x.photo_file_id,
      thumb: x.photo_file_id ? `/api/admin/uploads/${x.photo_file_id}/media` : x.photo_url,
      view: x.photo_url || (x.photo_file_id ? `/api/admin/uploads/${x.photo_file_id}/media` : ""),
    }))
    .slice(0, 1000);

  return new Response(JSON.stringify({ items }), { headers: { "content-type": "application/json" } });
}
