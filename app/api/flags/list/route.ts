/** @format */

import { NextRequest, NextResponse } from "next/server";
import { getFlags } from "@/lib/services/flagService";
import { withErrorHandler } from "@/lib/middleware/errorHandler";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return withErrorHandler(async () => {
    const sp = req.nextUrl.searchParams;
    const filters = {
      severity: sp.get("severity") || "",
      status: sp.get("status") || "",
      dateRange: sp.get("dateRange") || "week",
    };
    const data = await getFlags(filters);
    return NextResponse.json(data);
  });
}
