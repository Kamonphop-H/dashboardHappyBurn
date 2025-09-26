/** @format */

import { NextResponse } from "next/server";
import { getDashboardSummary } from "@/lib/services/dashboardService";
import { withErrorHandler } from "@/lib/middleware/errorHandler";
import { withCache } from "@/lib/middleware/cache";

export const runtime = "nodejs";
export const revalidate = 30;
export const dynamic = "force-dynamic";

export async function GET() {
  return withErrorHandler(async () => {
    return withCache(
      "dashboard:summary",
      async () => {
        const data = await getDashboardSummary();
        return NextResponse.json(data);
        await fetch("/api/dashboard/summary", { cache: "no-store" });
      },
      60
    ); // Cache for 60 seconds
  });
}
