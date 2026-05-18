import { createClient, SupabaseClient } from "@supabase/supabase-js";

function isValidServiceRoleKey(key: string): boolean {
  console.log("key: " + key);
  return key.startsWith("sb_secret_") || key.startsWith("eyJ");
}

function getServiceRoleKey(): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  console.log("key: " + key);

  if (!key) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY. Supabase → Project Settings → API → copy the secret key (sb_secret_...)."
    );
  }

  if (key.startsWith("sb_publishable_")) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY must be the secret key (sb_secret_...), not the publishable key."
    );
  }

  // if (!isValidServiceRoleKey(key)) {
  //   throw new Error(
  //     "Invalid Supabase service key. Use the secret key from Project Settings → API (starts with sb_secret_)."
  //   );
  // }

  return key;
}

/** Server-only Supabase client (bypasses RLS). Never import from client components. */
export function createAdminSupabaseClient(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
  }

  return createClient(url, getServiceRoleKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
