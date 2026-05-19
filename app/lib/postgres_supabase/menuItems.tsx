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

export type UpdateMenuItemInput = Partial<CreateMenuItemInput>;

/** Fetches menu via API so reads work even when RLS blocks the publishable key. */
export async function fetchMenuItems(): Promise<MenuItemRow[]> {
  const response = await fetch("/api/menu");

  const payload = (await response.json().catch(() => ({}))) as
    | MenuItemRow[]
    | { error?: string };

  if (!response.ok) {
    throw new Error(
      Array.isArray(payload)
        ? "Failed to load menu."
        : (payload.error ?? "Failed to load menu.")
    );
  }

  return payload as MenuItemRow[];
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

async function parseApiError(response: Response, fallback: string): Promise<string> {
  const payload = (await response.json().catch(() => ({}))) as { error?: string };
  return payload.error ?? fallback;
}

export async function updateMenuItem(
  id: number,
  updates: UpdateMenuItemInput
): Promise<MenuItemRow> {
  const response = await fetch(`/api/menu/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });

  const payload = (await response.json().catch(() => ({}))) as
    | MenuItemRow
    | { error?: string };

  if (!response.ok) {
    throw new Error(
      "error" in payload && payload.error
        ? payload.error
        : await parseApiError(response, "Failed to update menu item.")
    );
  }

  return payload as MenuItemRow;
}

export async function deleteMenuItem(id: number): Promise<void> {
  const response = await fetch(`/api/menu/${id}`, { method: "DELETE" });

  if (!response.ok) {
    throw new Error(await parseApiError(response, "Failed to delete menu item."));
  }
}   