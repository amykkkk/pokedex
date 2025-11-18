"use client";

import { signUpAction } from "@/app/actions/signup.action";
import FormInput from "@/components/common/form-input";
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
      <FormInput
        label="email"
        text="이메일"
        name="email"
        type="email"
        placeholder="you@example.com"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
      />
      <FormInput
        label="password"
        text="비밀번호"
        name="password"
        type="password"
        placeholder="••••••••"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        required
      />
      <FormInput
        label="repeat-password"
        text="Repeat Password"
        name="repeat-password"
        type="password"
        placeholder="••••••••"
        required
      />

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
