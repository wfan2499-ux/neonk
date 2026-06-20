import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qmflcdfdbkoeyajtqwlh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtZmxjZGZkYmtvZXlhanRxd2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NDcwMzUsImV4cCI6MjA5NzUyMzAzNX0.xXaHbD1vDOdEysIYHkqaIACG7XMLELbLwOgVu7uRJK0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export function getSupabase() { return supabase; }
