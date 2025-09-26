/** @format */

import { sheetsGet, toObjects, sumBy, toISODate, RANGES } from "@/lib/google";

export async function actuallyFetchSummary() {
  const [u, l] = await Promise.all([sheetsGet(RANGES.USERS), sheetsGet(RANGES.LOGS)]);

  const users = toObjects(u.values || []);
  const logs = toObjects(l.values || []);

  const today = new Date().toISOString().slice(0, 10);
  const logsToday = logs.filter((x) => toISODate(x.date) === today);

  const weeklyMap = new Map<string, { steps: number; kcal: number }>();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400 * 1000).toISOString().slice(0, 10);
    weeklyMap.set(d, { steps: 0, kcal: 0 });
  }
  for (const r of logs) {
    const d = toISODate(r.date);
    if (weeklyMap.has(d)) {
      const m = weeklyMap.get(d)!;
      m.steps += Number(r.steps || 0);
      m.kcal += Number(r.kcal || 0);
    }
  }
  const weeklyData = Array.from(weeklyMap.entries()).map(([date, v]) => ({ date, ...v }));

  const data = {
    totals: {
      users_total: users.length,
      users_active_today: new Set(logsToday.map((x) => String(x.employee_id || ""))).size,
      logs_today: logsToday.length,
      steps_today: sumBy(logsToday, (x) => Number(x.steps || 0)),
      kcal_today: sumBy(logsToday, (x) => Number(x.kcal || 0)),
    },
    data_quality: {
      new_rows_today: logsToday.length,
      new_photos_today: logsToday.filter((x) => x.photo_file_id || x.photo_url).length,
      error_rate: 0,
    },
    suspicious: { high: 0, med: 0, low: 0 },
    recentActivity: logs.slice(-12).reverse(),
    weeklyData,
  };

  return data;
}

// lib/services/dashboardService.ts
export type SuspiciousCounts = { high: number; med: number; low: number; pending?: number };
export type DashboardSummary = {
  totals: {
    users_total: number;
    users_active_today: number;
    logs_today: number;
    steps_today: number;
    kcal_today: number;
  };
  suspicious: SuspiciousCounts;
  weeklyData: any[];
  recentActivity: any[];
  data_quality: {
    new_rows_today: number;
    new_images_today: number;
    sync_error_rate: number;
  };
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  // ... ดึงข้อมูลจริงจาก Sheets/Drive/etc.
  const raw = await actuallyFetchSummary(); // ฟังก์ชันเดิมของคุณ

  // 👉 ใส่ค่าเริ่มต้นกันพังทุกฟิลด์
  return {
    totals: {
      users_total: raw?.totals?.users_total ?? 0,
      users_active_today: raw?.totals?.users_active_today ?? 0,
      logs_today: raw?.totals?.logs_today ?? 0,
      steps_today: raw?.totals?.steps_today ?? 0,
      kcal_today: raw?.totals?.kcal_today ?? 0,
    },
    suspicious: {
      high: raw?.suspicious?.high ?? 0,
      med: raw?.suspicious?.med ?? 0,
      low: raw?.suspicious?.low ?? 0,
      pending: raw?.suspicious?.pending ?? 0,
    },
    weeklyData: raw?.weeklyData ?? [],
    recentActivity: raw?.recentActivity ?? [],
    data_quality: {
      new_rows_today: raw?.data_quality?.new_rows_today ?? 0,
      new_images_today: raw?.data_quality?.new_images_today ?? 0,
      sync_error_rate: raw?.data_quality?.sync_error_rate ?? 0,
    },
  };
}
