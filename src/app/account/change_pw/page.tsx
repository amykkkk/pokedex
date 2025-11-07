"use client";

import { createClient } from "@/lib/supabase/client";
import { Loader } from "lucide-react";
import { useState } from "react";

export default function page() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const resetPassword = () => {
    if (!password) return;
    supabase.auth.updateUser({ password: password });
  };

  return (
    <div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]/80"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-search)] px-4 py-2 text-sm transition outline-none placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          placeholder="••••••••"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]/80"
        >
          비밀번호 확인
        </label>
        <input
          id="passwordCk"
          name="passwordCk"
          type="password"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-search)] px-4 py-2 text-sm transition outline-none placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          placeholder="••••••••"
        />
      </div>

      <div className="mb-4">
        <button
          className="bg-accent w-full rounded-lg py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          onClick={() => resetPassword()}
          disabled={loading}
        >
          {loading ? <Loader /> : "Update Password"}
        </button>
      </div>
    </div>
  );
}
