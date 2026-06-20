"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("الرجاء إدخال البريد وكلمة المرور");
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await getSupabase().auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      router.push("/admin/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "فشل تسجيل الدخول"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Neon-<span className="gradient-text">K</span>
          </h1>
          <p className="text-text-secondary text-sm mt-2">لوحة تحكم المشرف</p>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleLogin}
          className="neon-card p-6 space-y-5"
        >
          <h2 className="text-lg font-bold text-center">تسجيل الدخول</h2>

          {/* Email */}
          <div>
            <label className="block text-sm text-text-secondary mb-1.5">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
              placeholder="admin@neonk.sa"
              dir="ltr"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-text-secondary mb-1.5">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface border border-border text-white placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/50 transition-colors"
              placeholder="••••••••"
              dir="ltr"
              autoComplete="current-password"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full py-3.5 rounded-xl bg-neon-cyan text-black font-bold text-base hover:bg-neon-cyan/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
                  <path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-75" />
                </svg>
                جاري الدخول...
              </span>
            ) : (
              "دخول"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
