/** @format */

import { NextRequest } from "next/server";
import {
  sheetsGetValues,
  sheetsUpdateRow,
  sheetsAppend,
  a1RowRange,
  SHEET_USERS_RANGE,
  SHEET_AUDIT_RANGE,
} from "@/lib/googleServer";
export const runtime = "nodejs";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ employeeId: string }> }) {
  const { employeeId } = await params;
  const { patch = {}, reason = "manual", admin = "admin" } = await req.json();

  const data = await sheetsGetValues(SHEET_USERS_RANGE);
  const values = data.values || [];
  const header = values[0].map((x: any) => String(x ?? "").trim());
  const colIdx = header.map((h) => h.toLowerCase()).indexOf("employee_id");
  if (colIdx === -1) return new Response(JSON.stringify({ error: "no_employee_id_col" }), { status: 400 });

  const row = values.findIndex((r, i) => i > 0 && String(r[colIdx] || "") === employeeId);
  if (row < 1) return new Response(JSON.stringify({ error: "user_not_found" }), { status: 404 });

  const before = values[row].slice();
  const after = values[row].slice();
  for (const k of Object.keys(patch)) {
    const ci = header.map((h) => h.toLowerCase()).indexOf(k.toLowerCase());
    if (ci !== -1) after[ci] = patch[k];
  }

  const range = a1RowRange(SHEET_USERS_RANGE.split("!")[0], row, header.length);
  await sheetsUpdateRow(range, [after]);

  await sheetsAppend(SHEET_AUDIT_RANGE, [
    [
      new Date().toISOString(),
      "users",
      employeeId,
      admin,
      reason,
      JSON.stringify(Object.fromEntries(header.map((h, i) => [h, before[i]]))),
      JSON.stringify(Object.fromEntries(header.map((h, i) => [h, after[i]]))),
    ],
  ]);

  return new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" } });
}
