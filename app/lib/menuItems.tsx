import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseAnonKey, getSupabaseUrl } from "./supabaseEnv";

export const supabase: SupabaseClient = createClient(
  getSupabaseUrl(),
  getSupabaseAnonKey()
);

/** Match your table + columns in Supabase (example: public.menu_items) */
export type MenuItemRow = {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string | null;
  new_product: boolean | null;
};

export async function fetchMenuItems(): Promise<MenuItemRow[]> {
  const { data, error } = await supabase
    .from("Menu")
    .select("*")
    .order("id", { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function createMenuItem(menuItem: MenuItemRow): Promise<MenuItemRow> {
  const { data, error } = await supabase
    .from("Menu")
    .insert(menuItem)
    .select()
    .single();

  if (error) throw error;
  return data;
}   