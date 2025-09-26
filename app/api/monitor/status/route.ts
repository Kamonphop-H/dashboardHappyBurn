/** @format */

import { NextResponse } from "next/server";
import { getMonitorStatus } from "@/lib/services/monitorService";
import { withErrorHandler } from "@/lib/middleware/errorHandler";

export const runtime = "nodejs";

export async function GET() {
  return withErrorHandler(async () => {
    const data = await getMonitorStatus();
    return NextResponse.json(data);
  });
}
