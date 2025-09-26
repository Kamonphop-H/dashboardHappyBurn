/** @format */

// hooks/useDashboardData.ts
import { useEffect, useState } from "react";
import type { DashboardSummary } from "@/lib/services/dashboardService";

const EMPTY: DashboardSummary = {
  totals: { users_total: 0, users_active_today: 0, logs_today: 0, steps_today: 0, kcal_today: 0 },
  suspicious: { high: 0, med: 0, low: 0, pending: 0 },
  weeklyData: [],
  recentActivity: [],
  data_quality: { new_rows_today: 0, new_images_today: 0, sync_error_rate: 0 },
};

export function useDashboardData() {
  const [data, setData] = useState<DashboardSummary>(EMPTY);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetcher = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/dashboard/summary", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as Partial<DashboardSummary>;
      // merge กับ EMPTY เพื่อกัน field หาย
      setData({
        ...EMPTY,
        ...json,
        totals: { ...EMPTY.totals, ...(json.totals ?? {}) },
        suspicious: { ...EMPTY.suspicious, ...(json.suspicious ?? {}) },
        data_quality: { ...EMPTY.data_quality, ...(json.data_quality ?? {}) },
        weeklyData: json.weeklyData ?? [],
        recentActivity: json.recentActivity ?? [],
      });
    } catch (e: any) {
      setError(e);
      setData(EMPTY);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetcher();
  }, []);

  return { data, loading, error, refetch: fetcher };
}
