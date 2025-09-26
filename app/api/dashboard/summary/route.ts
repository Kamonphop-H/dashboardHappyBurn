/** @format */

import { sheetsGetValues, toObjects, sumBy, SHEET_USERS_RANGE, SHEET_LOGS_RANGE } from "@/lib/googleServer";
export const runtime = "nodejs";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const [u, l] = await Promise.all([sheetsGetValues(SHEET_USERS_RANGE), sheetsGetValues(SHEET_LOGS_RANGE)]);
  const users = toObjects(u.values || []);
  const logs = toObjects(l.values || []);
  const logsToday = logs.filter((x) => String(x.date || "").startsWith(today));
  const stepsToday = sumBy(logsToday, (x) => Number(x.steps || 0));
  const kcalToday = sumBy(logsToday, (x) => Number(x.kcal || 0));
  const activeToday = new Set(logsToday.map((x) => String(x.employee_id || ""))).size;

  const resp = {
    totals: {
      users_total: users.length,
      users_active_today: activeToday,
      logs_today: logsToday.length,
      steps_today: stepsToday,
      kcal_today: kcalToday,
    },
    data_quality: {
      new_rows_today: logsToday.length,
      new_photos_today: logsToday.filter((x) => x.photo_file_id).length,
    },
    suspicious: { high: 0, med: 0, low: 0, pending: 0 },
    credits: { days_over_7000_today: logsToday.filter((x) => Number(x.steps || 0) >= 7000).length },
  };
  return new Response(JSON.stringify(resp), { headers: { "content-type": "application/json" } });
}
