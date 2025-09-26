/** @format */

import { NextResponse } from "next/server";
import { recomputeFlags } from "@/lib/services/flagService";
import { withErrorHandler } from "@/lib/middleware/errorHandler";

export const runtime = "nodejs";

export async function POST() {
  return withErrorHandler(async () => {
    const out = await recomputeFlags();
    return NextResponse.json(out);
  });
}
