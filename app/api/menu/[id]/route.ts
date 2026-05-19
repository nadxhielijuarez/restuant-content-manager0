import { NextResponse } from "next/server";
import { requireAdminUser } from "@/app/lib/auth/requireAdmin";
import type { UpdateMenuItemInput } from "@/app/lib/postgres_supabase/menuItems";
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

function parseMenuId(id: string): number | NextResponse {
  const menuId = Number(id);
  if (!Number.isInteger(menuId) || menuId <= 0) {
    return NextResponse.json({ error: "Invalid menu item id." }, { status: 400 });
  }
  return menuId;
}

export async function PATCH(request: Request, context: RouteContext) {
  const authError = await requireAdmin();
  if (authError) return authError;

  const { id } = await context.params;
  const menuId = parseMenuId(id);
  if (menuId instanceof NextResponse) return menuId;

  let body: UpdateMenuItemInput;
  try {
    body = (await request.json()) as UpdateMenuItemInput;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = body.name.trim();
  if (body.price !== undefined) updates.price = body.price.trim();
  if (body.description !== undefined) updates.description = body.description.trim();
  if (body.image !== undefined) updates.image = body.image;
  if (body.new_product !== undefined) updates.new_product = body.new_product;
  if (body["out-of-stock"] !== undefined) updates["out-of-stock"] = body["out-of-stock"];

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
    .from("Menu")
    .update(updates)
    .eq("id", menuId)
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
  const menuId = parseMenuId(id);
  if (menuId instanceof NextResponse) return menuId;

  let supabase;
  try {
    supabase = createAdminSupabaseClient();
  } catch (configError) {
    const message =
      configError instanceof Error ? configError.message : "Supabase not configured.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  const { error } = await supabase.from("Menu").delete().eq("id", menuId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
