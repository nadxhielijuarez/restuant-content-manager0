import { NextResponse } from "next/server";
import { requireAdminUser } from "@/app/lib/auth/requireAdmin";
import type { CreateFindUsRowInput } from "@/app/lib/postgres_supabase/findUsRows";
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
    .from("FindUs")
    .select("*")
    .order("date", { ascending: true })
    .order("time", { ascending: true });

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

  let body: CreateFindUsRowInput;
  try {
    body = (await request.json()) as CreateFindUsRowInput;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { market_title, market_address, date, time } = body;
  if (!market_title?.trim() || !market_address?.trim() || !date?.trim() || !time?.trim()) {
    return NextResponse.json(
      { error: "Date, time, market name, and address are required." },
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
    .from("FindUs")
    .insert({
      market_title: market_title.trim(),
      market_address: market_address.trim(),
      date: date.trim(),
      time: time.trim(),
    })
    .select()
    .single();

  if (error) {
    console.error("FindUs insert failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
