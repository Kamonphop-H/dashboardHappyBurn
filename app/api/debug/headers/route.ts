/** @format */

import {
  sheetsGetValuesSafe,
  SHEET_USERS_RANGE,
  SHEET_LOGS_RANGE,
  SHEET_SESSIONS_RANGE,
  SHEET_CREDITS_RANGE,
  SHEET_DEPTS_RANGE,
  SHEET_FLAGS_RANGE,
} from "@/lib/googleServer";

export const runtime = "nodejs";
export async function GET() {
  const read = async (range: string) => (await sheetsGetValuesSafe(range)).values?.[0] || [];
  const res = {
    users: await read(SHEET_USERS_RANGE),
    logs: await read(SHEET_LOGS_RANGE),
    sessions: await read(SHEET_SESSIONS_RANGE),
    credits: await read(SHEET_CREDITS_RANGE),
    depts: await read(SHEET_DEPTS_RANGE),
    flags: await read(SHEET_FLAGS_RANGE),
  };
  return new Response(JSON.stringify(res), { headers: { "content-type": "application/json" } });
}
