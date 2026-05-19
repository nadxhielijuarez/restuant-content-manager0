import { NextResponse } from "next/server";
import { requireAdminUser } from "@/app/lib/auth/requireAdmin";
import type { CreateMenuItemInput } from "@/app/lib/postgres_supabase/menuItems";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export async function GET() {
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
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  try {
    await requireAdminUser();
  } catch {
    return NextResponse.json(
      { error: "You must be logged in as an admin." },
      { status: 401 }
    );
  }

  let body: CreateMenuItemInput;
  try {
    body = (await request.json()) as CreateMenuItemInput;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, price, description, image, new_product, "out-of-stock": outOfStock } =
    body;
  if (!name?.trim() || !price?.trim() || !description?.trim()) {
    return NextResponse.json(
      { error: "Name, price, and description are required." },
      { status: 400 }
    );
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
    .insert({
      name: name.trim(),
      price: price.trim(),
      description: description.trim(),
      image: image ?? null,
      new_product: new_product ?? false,
      "out-of-stock": outOfStock ?? false,
    })
    .select()
    .single();

  if (error) {
    console.error("Menu insert failed:", error);
    const message =
      error.message === "Invalid API key"
        ? "Invalid Supabase service key. Set SUPABASE_SERVICE_ROLE_KEY to sb_secret_... from Project Settings → API."
        : error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
