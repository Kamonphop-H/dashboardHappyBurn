/** @format */
import { NextRequest } from "next/server";
import {
  sheetsGetValues,
  sheetsGetValuesSafe,
  toObjects,
  sumBy,
  SHEET_USERS_RANGE,
  SHEET_LOGS_RANGE,
  SHEET_CREDITS_RANGE,
} from "@/lib/googleServer";

export const runtime = "nodejs";

// แปลงวันที่ให้เป็นสตริง YYYY-MM-DD รองรับ string / number(serial) / Date
function toISODate(v: any): string {
  if (!v && v !== 0) return "";
  if (typeof v === "string") {
    const s = v.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
    return "";
  }
  if (typeof v === "number") {
    const ms = Math.round((v - 25569) * 86400 * 1000);
    return new Date(ms).toISOString().slice(0, 10);
  }
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return "";
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("query") || "").toLowerCase().trim();
  const from = req.nextUrl.searchParams.get("from") || "1900-01-01";
  const to = req.nextUrl.searchParams.get("to") || "2999-12-31";

  const [u, l, c] = await Promise.all([
    sheetsGetValues(SHEET_USERS_RANGE),
    sheetsGetValues(SHEET_LOGS_RANGE),
    sheetsGetValuesSafe(SHEET_CREDITS_RANGE), // อาจว่างได้
  ]);

  const users = toObjects(u.values || []);
  const logs = toObjects(l.values || []);
  const credits = toObjects(c.values || []);

  // เครดิตล่าสุดต่อ user
  const latestCredits = new Map<string, any>();
  for (const row of credits) {
    const id = String(row.employee_id || "");
    const cur = latestCredits.get(id);
    if (!cur || String(row.week_end || "") > String(cur.week_end || "")) {
      latestCredits.set(id, row);
    }
  }

  // กรองช่วงด้วยวันที่ normalized; ถ้าไม่เจออะไร ให้ fallback = logs ทั้งหมด
  let inRange = logs.filter((x) => {
    const d = toISODate(x.date);
    return d && d >= from && d <= to;
  });
  if (inRange.length === 0 && logs.length > 0) {
    inRange = logs;
  }

  const items = users
    .filter(
      (u) =>
        !q ||
        ["employee_id", "full_name", "email", "dept", "group_type"].some((k) =>
          String((u as any)[k] || "")
            .toLowerCase()
            .includes(q)
        )
    )
    .slice(0, 200)
    .map((u) => {
      const id = String((u as any).employee_id || "");
      const my = inRange.filter((x) => String(x.employee_id || "") === id);
      const over7k = my.filter((x) => Number(x.steps || 0) >= 7000).length;
      const credit = latestCredits.get(id) || {};
      return {
        employee_id: (u as any).employee_id,
        full_name: (u as any).full_name,
        dept: (u as any).dept,
        group_type: (u as any).group_type,
        status: (u as any).status,
        last_login_at: (u as any).last_login_at,
        account_created: (u as any).account_created,
        steps_sum: sumBy(my, (x) => Number(x.steps || 0)),
        kcal_sum: sumBy(my, (x) => Number(x.kcal || 0)),
        days_over_7000: over7k,
        credits_this_week: Number((credit as any).credits || 0),
      };
    });

  return new Response(JSON.stringify({ items }), {
    headers: { "content-type": "application/json" },
  });
}
