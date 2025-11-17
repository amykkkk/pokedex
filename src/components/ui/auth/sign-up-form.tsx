"use client";

import { signUpAction } from "@/app/actions/signup.action";
import { Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(signUpAction, null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (!state.status) {
      if (state.data) {
        setUser({
          email: state.data.email,
          password: state.data.password,
        });
      }
      return setError(state.error);
    }

    router.push("/sign-up-success");
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
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
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
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-search)] px-4 py-2 text-sm transition outline-none placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </div>

      <div>
        <label
          htmlFor="repeat-password"
          className="mb-2 block text-sm font-medium text-[var(--color-text)]/80"
        >
          Repeat Password
        </label>
        <input
          id="repeat-password"
          name="repeat-password"
          type="password"
          required
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-search)] px-4 py-2 text-sm transition outline-none placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20"
          placeholder="••••••••"
        />
      </div>

      <div className="mt-2 flex flex-col gap-3">
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Loader /> : "Sign up"}
        </button>
      </div>

      <div className="mt-5 text-center text-xs text-[var(--color-text)]/50">
        Already have an account?&nbsp;
        <Link href="/auth/login">Login</Link>
      </div>
    </form>
  );
}
