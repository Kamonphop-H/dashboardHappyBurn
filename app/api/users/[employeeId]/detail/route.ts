/** @format */
import { NextRequest } from "next/server";
import {
  sheetsGetValues,
  sheetsGetValuesSafe,
  toObjects,
  sumBy,
  SHEET_USERS_RANGE,
  SHEET_LOGS_RANGE,
  SHEET_SESSIONS_RANGE,
  SHEET_CREDITS_RANGE,
  SHEET_FLAGS_RANGE,
} from "@/lib/googleServer";

export const runtime = "nodejs";

// แปลงวันที่ให้เป็นสตริง YYYY-MM-DD รองรับ string / number(serial) / Date
function toISODate(v: any): string {
  if (!v && v !== 0) return "";
  if (typeof v === "string") {
    const s = v.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10); // "2025-09-24" หรือ "2025-09-24T..."
    return ""; // รูปแบบอื่นๆ ไม่รองรับในที่นี้
  }
  if (typeof v === "number") {
    // Excel/Sheets serial (day count from 1899-12-30)
    const ms = Math.round((v - 25569) * 86400 * 1000);
    return new Date(ms).toISOString().slice(0, 10);
  }
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return "";
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ employeeId: string }> }) {
  const { employeeId } = await params;
  const from = req.nextUrl.searchParams.get("from") || "1900-01-01";
  const to = req.nextUrl.searchParams.get("to") || "2999-12-31";

  const [u, l, s, c, f] = await Promise.all([
    sheetsGetValues(SHEET_USERS_RANGE),
    sheetsGetValues(SHEET_LOGS_RANGE),
    sheetsGetValuesSafe(SHEET_SESSIONS_RANGE),
    sheetsGetValuesSafe(SHEET_CREDITS_RANGE),
    sheetsGetValuesSafe(SHEET_FLAGS_RANGE),
  ]);

  const users = toObjects(u.values || []);
  const logs = toObjects(l.values || []);
  const sessions = toObjects(s.values || []);
  const credits = toObjects(c.values || []);
  const flags = toObjects(f.values || []);

  const profile = users.find((x) => String(x.employee_id || "") === employeeId) || null;

  const allMine = logs.filter((x) => String(x.employee_id || "") === employeeId);

  // กรองด้วยวันที่หลัง normalize; ถ้าไม่เจอให้ fallback เป็นทั้งหมดของคนนี้
  let myLogs = allMine.filter((x) => {
    const d = toISODate(x.date);
    return d && d >= from && d <= to;
  });
  if (myLogs.length === 0 && allMine.length > 0) {
    myLogs = allMine;
  }

  const resp = {
    profile,
    stats: {
      logs_count: myLogs.length,
      steps_sum: sumBy(myLogs, (x) => Number(x.steps || 0)),
      kcal_sum: sumBy(myLogs, (x) => Number(x.kcal || 0)),
      days_over_7000: myLogs.filter((x) => Number(x.steps || 0) >= 7000).length,
    },
    logs: myLogs.slice(-200),
    sessions: sessions.filter((x) => String(x.employee_id || "") === employeeId).slice(-20),
    credits: credits.filter((x) => String(x.employee_id || "") === employeeId).slice(-26),
    flags: flags.filter((x) => String(x.employee_id || "") === employeeId).slice(-100),
  };

  return new Response(JSON.stringify(resp), {
    headers: { "content-type": "application/json" },
  });
}
