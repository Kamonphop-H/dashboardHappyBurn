/** @format */

import { NextRequest } from "next/server";
import {
  sheetsGetValues,
  toObjects,
  sheetsAppend,
  SHEET_FLAGS_RANGE,
  SHEET_LOGS_RANGE,
} from "@/lib/googleServer";
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const { employeeId } = await req.json().catch(() => ({}));
  const logs = toObjects((await sheetsGetValues(SHEET_LOGS_RANGE)).values || []).filter(
    (x) => !employeeId || String(x.employee_id || "") === employeeId
  );

  const flags: any[][] = [];
  for (const r of logs) {
    if (Number(r.steps || 0) >= 7000 && !r.photo_file_id && !r.photo_url) {
      flags.push([
        new Date().toISOString(),
        "no_evidence",
        "LOW",
        r.employee_id,
        r.date,
        JSON.stringify({ steps: r.steps }),
      ]);
    }
  }
  if (flags.length) await sheetsAppend(SHEET_FLAGS_RANGE, flags);
  return new Response(JSON.stringify({ created: flags.length }), {
    headers: { "content-type": "application/json" },
  });
}
