import { NextResponse } from "next/server";
import { requireAdminUser } from "@/app/lib/auth/requireAdmin";
import type { UpdateFindUsRowInput } from "@/app/lib/postgres_supabase/findUsRows";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

type RouteContext = { params: Promise<{ id: string }> };

async function requireAdmin() {
  try {
    await requireAdminUser();
  } catch {
    return NextResponse.json(
      { error: "You must be logged in as an admin." },
      { status: 401 }
    );
  }
  return null;
}

function parseFindUsId(id: string): number | NextResponse {
  const rowId = Number(id);
  if (!Number.isInteger(rowId) || rowId <= 0) {
    return NextResponse.json({ error: "Invalid location id." }, { status: 400 });
  }
  return rowId;
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const rowId = parseFindUsId(id);
  if (rowId instanceof NextResponse) return rowId;

  let body: UpdateFindUsRowInput;
  try {
    body = (await request.json()) as UpdateFindUsRowInput;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (body.market_title !== undefined) updates.market_title = body.market_title.trim();
  if (body.market_address !== undefined) updates.market_address = body.market_address.trim();
  if (body.date !== undefined) updates.date = body.date.trim();
  if (body.time !== undefined) updates.time = body.time.trim();

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No fields to update." }, { status: 400 });
  }

  let supabase;
  try {
    supabase = createAdminSupabaseClient();
  } catch (configError) {
    const message =
      configError instanceof Error ? configError.message : "Supabase not configured.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { data, error } = await supabase
    .from("FindUs")
    .update(updates)
    .eq("id", rowId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const rowId = parseFindUsId(id);
  if (rowId instanceof NextResponse) return rowId;

  let supabase;
  try {
    supabase = createAdminSupabaseClient();
  } catch (configError) {
    const message =
      configError instanceof Error ? configError.message : "Supabase not configured.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { error } = await supabase.from("FindUs").delete().eq("id", rowId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
