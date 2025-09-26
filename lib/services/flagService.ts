/** @format */

import { sheetsGetSafe, sheetsGet, sheetsAppend, toObjects, RANGES } from "@/lib/google";

export async function getFlags(filters: { severity: string; status: string; dateRange: string }) {
  const raw = await sheetsGetSafe(RANGES.FLAGS);
  const items = toObjects(raw.values || []);
  // filter แบบง่าย ๆ
  const list = items
    .filter((x: any) => {
      const okSeverity =
        !filters.severity ||
        String(x.severity || x[2] || "").toLowerCase() === filters.severity.toLowerCase();
      const okStatus =
        !filters.status || String(x.status || "").toLowerCase() === filters.status.toLowerCase();
      return okSeverity && okStatus;
    })
    .slice(-500)
    .reverse();

  // สถิติระดับความรุนแรง
  const stats = { high: 0, med: 0, low: 0 };
  for (const r of items) {
    const sev = String(r.severity || r[2] || "").toLowerCase();
    if (sev === "high") stats.high++;
    else if (sev === "med" || sev === "medium") stats.med++;
    else if (sev === "low") stats.low++;
  }
  return { items: list, stats };
}

// ตัวอย่าง rule ง่ายๆ: steps >= 7000 แต่ไม่มีรูป -> LOW
export async function recomputeFlags() {
  const raw = await sheetsGet(RANGES.LOGS);
  const logs = toObjects(raw.values || []);
  const newFlags: any[][] = [];

  for (const r of logs) {
    const steps = Number(r.steps || 0);
    const noPhoto = !(r.photo_file_id || r.photo_url);
    if (steps >= 7000 && noPhoto) {
      newFlags.push([
        new Date().toISOString(),
        "no_evidence",
        "LOW",
        r.employee_id,
        r.date,
        JSON.stringify({ steps }),
      ]);
    }
  }

  if (newFlags.length) await sheetsAppend(RANGES.FLAGS, newFlags);
  return { created: newFlags.length };
}
