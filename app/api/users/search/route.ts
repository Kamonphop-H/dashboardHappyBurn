/** @format */

import { NextRequest, NextResponse } from "next/server";
import { searchUsers } from "@/lib/services/userService";
import { withErrorHandler } from "@/lib/middleware/errorHandler";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  return withErrorHandler(async () => {
    const searchParams = req.nextUrl.searchParams;
    const filters = {
      query: searchParams.get("query") || "",
      from: searchParams.get("from") || "",
      to: searchParams.get("to") || "",
      status: searchParams.get("status") || "",
      department: searchParams.get("department") || "",
      page: parseInt(searchParams.get("page") || "1"),
      limit: parseInt(searchParams.get("limit") || "20"),
      sortBy: searchParams.get("sortBy") || "employee_id",
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "asc",
    };

    const result = await searchUsers(filters);
    return NextResponse.json(result);
  });
}
