/** @format */

import { sheetsGet, toObjects, RANGES } from "@/lib/google";

export async function listEvidence(filters: { from: string; to: string; userId: string; limit: number }) {
  const raw = await sheetsGet(RANGES.LOGS);
  const logs = toObjects(raw.values || []);

  let arr = logs.filter((x: any) => x.photo_file_id || x.photo_url);
  if (filters.userId) arr = arr.filter((x: any) => String(x.employee_id || "") === filters.userId);
  arr = arr.slice(-Math.max(10, filters.limit || 60)).reverse();

  return {
    items: arr.map((x) => ({
      employee_id: x.employee_id,
      date: x.date,
      fileId: x.photo_file_id || "",
      thumb: x.photo_file_id ? `/api/admin/uploads/${x.photo_file_id}/media` : x.photo_url,
      view: x.photo_url || (x.photo_file_id ? `/api/admin/uploads/${x.photo_file_id}/media` : ""),
    })),
  };
}
