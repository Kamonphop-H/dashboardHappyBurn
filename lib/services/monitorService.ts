/** @format */

import { sheetsGet, RANGES } from "@/lib/google";

export async function getMonitorStatus() {
  const t0 = Date.now();
  const logs = await sheetsGet(RANGES.LOGS);
  const latency = Date.now() - t0;

  return {
    health: { api: "online", sheets: "online" },
    sync: { logs_rows: logs.values?.length || 0, last_run: new Date().toISOString() },
    performance: { sheets_latency_ms: latency },
    errors: [],
  };
}
