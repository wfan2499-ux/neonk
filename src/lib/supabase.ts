import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  _client = createClient(url, key);
  return _client;
}

// Lazy singleton — safe for static export (never runs at build time)
export const supabase: SupabaseClient = {
  get auth() { return getSupabase().auth; },
  get storage() { return getSupabase().storage; },
  get from() { return getSupabase().from.bind(getSupabase()); },
  get rpc() { return getSupabase().rpc.bind(getSupabase()); },
  get functions() { return getSupabase().functions; },
  get realtime() { return getSupabase().realtime; },
  // TS escape hatch for the rest
} as unknown as SupabaseClient;
