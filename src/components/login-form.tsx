"use client";

import { loginAction } from "@/app/actions/login.aciton";
import { useAuthStore } from "@/stores/auth-store";
import { Loader, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const { setUser } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (!state.status) {
      return alert(state.error);
    }

    setUser(state.user);
    router.push("/");
  }, [state]);

  return (
    <form className="space-y-5" action={formAction}>
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]/80"
        >
          이메일
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-search)] px-4 py-2 text-sm transition outline-none placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]/80"
        >
          비밀번호
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-search)] px-4 py-2 text-sm transition outline-none placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <button
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Loader /> : "로그인"}
        </button>
        <Link
          className="flex items-center justify-center gap-2 rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-2 text-sm font-semibold text-[var(--color-text)] transition hover:bg-[var(--color-search)]"
          href="/signup"
        >
          계정 생성
        </Link>
      </div>
    </form>
  );
}
