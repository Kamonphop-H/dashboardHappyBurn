/** @format */

import { NextResponse } from "next/server";
import { readHeadersSnapshot } from "@/lib/services/debugService";
export const runtime = "nodejs";
export async function GET() {
  const data = await readHeadersSnapshot();
  return NextResponse.json(data);
}
