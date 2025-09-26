/** @format */

import { NextRequest, NextResponse } from "next/server";
import { getUserDetail, updateUser } from "@/lib/services/userService";
import { withErrorHandler } from "@/lib/middleware/errorHandler";
import { withAuth } from "@/lib/middleware/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withErrorHandler(async () => {
    const { id } = await params;
    const user = await getUserDetail(id);
    return NextResponse.json(user);
  });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  return withAuth(async () => {
    return withErrorHandler(async () => {
      const { id } = await params;
      const body = await req.json();
      const updated = await updateUser(id, body);
      return NextResponse.json(updated);
    });
  });
}
