/** @format */

import { NextRequest, NextResponse } from "next/server";
import { listEvidence } from "@/lib/services/evidenceService";
import { withErrorHandler } from "@/lib/middleware/errorHandler";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return withErrorHandler(async () => {
    const sp = req.nextUrl.searchParams;
    const filters = {
      from: sp.get("from") || "",
      to: sp.get("to") || "",
      userId: sp.get("userId") || "",
      limit: parseInt(sp.get("limit") || "60", 10),
    };
    const data = await listEvidence(filters);
    return NextResponse.json(data);
  });
}
