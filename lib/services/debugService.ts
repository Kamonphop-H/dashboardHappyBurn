/** @format */

import { sheetsGetSafe, RANGES } from "@/lib/google";

export async function readHeadersSnapshot() {
  const read = async (r: string) => (await sheetsGetSafe(r)).values?.[0] || [];
  return {
    users: await read(RANGES.USERS),
    logs: await read(RANGES.LOGS),
    sessions: await read(RANGES.SESSIONS),
    credits: await read(RANGES.CREDITS),
    depts: await read(RANGES.DEXTS || RANGES.DEPTS), // guard
    flags: await read(RANGES.FLAGS),
  };
}
