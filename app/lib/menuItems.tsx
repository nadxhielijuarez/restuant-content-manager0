import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl } from "./supabaseEnv";

export const supabase: SupabaseClient = createClient(
  getSupabaseUrl(),
  getSupabaseAnonKey()
);

/** Matches Supabase public."Menu" table columns */
export type MenuItemRow = {
  id?: number;
  created_at?: string;
  name: string;
  price: string;
  description: string;
  image: string | null;
  new_product: boolean | null;
  "out-of-stock": boolean | null;
};

export type CreateMenuItemInput = {
  name: string;
  price: string;
  description: string;
  image: string | null;
  new_product?: boolean | null;
  "out-of-stock"?: boolean | null;
};

export async function fetchMenuItems(): Promise<MenuItemRow[]> {
  const { data, error } = await supabase
    .from("Menu")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

/** Inserts via server API so admin writes bypass Supabase RLS. */
export async function createMenuItem(
  menuItem: CreateMenuItemInput
): Promise<MenuItemRow> {
  const response = await fetch("/api/menu", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(menuItem),
  });

  const payload = (await response.json().catch(() => ({}))) as
    | MenuItemRow
    | { error?: string };

  if (!response.ok) {
    throw new Error(
      "error" in payload && payload.error
        ? payload.error
        : "Failed to create menu item."
    );
  }

  return payload as MenuItemRow;
}   