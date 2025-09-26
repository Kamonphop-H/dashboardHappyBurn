/** @format */

import { NextRequest } from "next/server";
import { sheetsGetValues, toObjects, driveGetFileMeta, SHEET_LOGS_RANGE } from "@/lib/googleServer";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ employeeId: string }> }) {
  const { employeeId } = await params;
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get("limit") || "12", 10), 48);

  const logs = toObjects((await sheetsGetValues(SHEET_LOGS_RANGE)).values || []).filter(
    (r) => String(r.employee_id || "") === employeeId && (r.photo_file_id || r.photo_url)
  );

  const latest = logs
    .sort(
      (a: any, b: any) =>
        new Date(b.created_at || b.date || 0).getTime() - new Date(a.created_at || a.date || 0).getTime()
    )
    .slice(0, limit);

  const items = await Promise.all(
    latest.map(async (x: any) => {
      const fid = String(x.photo_file_id || "");
      if (fid) {
        try {
          const m = await driveGetFileMeta(fid);
          return {
            id: fid,
            name: m.name,
            createdTime: m.createdTime,
            thumb: `/api/admin/uploads/${fid}/media`,
            view: m.webViewLink,
          };
        } catch {}
      }
      return {
        id: fid || String(x.photo_url || ""),
        createdTime: x.created_at || x.date,
        thumb: x.photo_url || "",
        view: x.photo_url || "",
      };
    })
  );

  return new Response(JSON.stringify({ items }), { headers: { "content-type": "application/json" } });
}
