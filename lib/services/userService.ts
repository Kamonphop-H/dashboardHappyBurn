/** @format */

import {
  sheetsGet,
  sheetsGetSafe,
  sheetsUpdate,
  sheetsAppend,
  toObjects,
  toISODate,
  sumBy,
  a1RowRange,
  RANGES,
} from "@/lib/google";

export async function searchUsers(filters: {
  query: string;
  from: string;
  to: string;
  status: string;
  department: string;
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: "asc" | "desc";
}) {
  const [u, l, c] = await Promise.all([
    sheetsGet(RANGES.USERS),
    sheetsGet(RANGES.LOGS),
    sheetsGetSafe(RANGES.CREDITS),
  ]);
  const users = toObjects(u.values || []);
  const logs = toObjects(l.values || []);
  const credits = toObjects(c.values || []);

  // map เครดิตสัปดาห์ล่าสุด
  const latestCredits = new Map<string, any>();
  for (const row of credits) {
    const id = String(row.employee_id || "");
    const cur = latestCredits.get(id);
    if (!cur || String(row.week_end || "") > String(cur.week_end || "")) latestCredits.set(id, row);
  }

  let inRange = logs.filter((x) => {
    const d = toISODate(x.date);
    return (!filters.from || d >= filters.from) && (!filters.to || d <= filters.to);
  });
  if (inRange.length === 0 && logs.length > 0) inRange = logs;

  let list = users
    .filter((u) => {
      const q = filters.query?.toLowerCase();
      const okQ =
        !q ||
        ["employee_id", "full_name", "email", "dept", "group_type"].some((k) =>
          String((u as any)[k] || "")
            .toLowerCase()
            .includes(q)
        );
      const okStatus = !filters.status || String((u as any).status || "") === filters.status;
      const okDept = !filters.department || String((u as any).dept || "") === filters.department;
      return okQ && okStatus && okDept;
    })
    .map((u) => {
      const id = String((u as any).employee_id || "");
      const my = inRange.filter((x) => String(x.employee_id || "") === id);
      return {
        employee_id: id,
        full_name: (u as any).full_name,
        dept: (u as any).dept,
        group_type: (u as any).group_type,
        status: (u as any).status,
        last_login_at: (u as any).last_login_at,
        account_created: (u as any).account_created,
        steps_sum: sumBy(my, (x) => Number(x.steps || 0)),
        kcal_sum: sumBy(my, (x) => Number(x.kcal || 0)),
        days_over_7000: my.filter((x) => Number(x.steps || 0) >= 7000).length,
        credits_this_week: Number((latestCredits.get(id) || {}).credits || 0),
      };
    });

  // sort
  list.sort((a: any, b: any) => {
    const k = filters.sortBy;
    const sa = a[k];
    const sb = b[k];
    if (filters.sortOrder === "desc") return sb > sa ? 1 : sb < sa ? -1 : 0;
    return sa > sb ? 1 : sa < sb ? -1 : 0;
  });

  // paginate
  const total = list.length;
  const start = (filters.page - 1) * filters.limit;
  const items = list.slice(start, start + filters.limit);

  return { items, total, page: filters.page, limit: filters.limit };
}

export async function getUserDetail(id: string) {
  const [u, l, s, c, f] = await Promise.all([
    sheetsGet(RANGES.USERS),
    sheetsGet(RANGES.LOGS),
    sheetsGetSafe(RANGES.SESSIONS),
    sheetsGetSafe(RANGES.CREDITS),
    sheetsGetSafe(RANGES.FLAGS),
  ]);

  const users = toObjects(u.values || []);
  const logs = toObjects(l.values || []);
  const sessions = toObjects(s.values || []);
  const credits = toObjects(c.values || []);
  const flags = toObjects(f.values || []);

  const profile = users.find((x) => String(x.employee_id || "") === id) || null;
  const myLogs = logs.filter((x) => String(x.employee_id || "") === id);

  return {
    ...profile,
    stats: {
      logs_count: myLogs.length,
      steps_sum: sumBy(myLogs, (x) => Number(x.steps || 0)),
      kcal_sum: sumBy(myLogs, (x) => Number(x.kcal || 0)),
      days_over_7000: myLogs.filter((x) => Number(x.steps || 0) >= 7000).length,
    },
    activities: myLogs.slice(-100).reverse(),
    flags: flags
      .filter((x) => String(x.employee_id || "") === id)
      .slice(-50)
      .reverse(),
    sessions: sessions
      .filter((x) => String(x.employee_id || "") === id)
      .slice(-20)
      .reverse(),
    credits: credits
      .filter((x) => String(x.employee_id || "") === id)
      .slice(-26)
      .reverse(),
  };
}

export async function updateUser(
  id: string,
  body: { patch: Record<string, any>; reason?: string; admin?: string }
) {
  const raw = await sheetsGet(RANGES.USERS);
  const values = raw.values || [];
  const header = values[0].map((x: any) => String(x ?? "").trim());
  const idxId = header.map((h) => h.toLowerCase()).indexOf("employee_id");
  const rowIdx = values.findIndex((r, i) => i > 0 && String(r[idxId] || "") === id);
  if (rowIdx < 1) throw new Error("user_not_found");

  const before = values[rowIdx].slice();
  const after = values[rowIdx].slice();
  for (const [k, v] of Object.entries(body.patch || {})) {
    const i = header.map((h) => h.toLowerCase()).indexOf(k.toLowerCase());
    if (i !== -1) after[i] = v;
  }

  const sheetName = RANGES.USERS.split("!")[0];
  await sheetsUpdate(a1RowRange(sheetName, rowIdx, header.length), [after]);

  // audit
  await sheetsAppend(RANGES.AUDIT, [
    [
      new Date().toISOString(),
      "users",
      id,
      body.admin || "admin",
      body.reason || "manual",
      JSON.stringify(Object.fromEntries(header.map((h, i) => [h, before[i]]))),
      JSON.stringify(Object.fromEntries(header.map((h, i) => [h, after[i]]))),
    ],
  ]);

  return { ok: true };
}
