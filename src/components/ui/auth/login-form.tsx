"use client";

import { loginAction } from "@/app/actions/login.aciton";
import FormInput from "@/components/common/form-input";
import { Loader, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;

    if (!state.status) {
      return alert(state.error);
    }

    router.push("/");
  }, [state]);

  return (
    <form className="space-y-5" action={formAction}>
      <FormInput
        label="email"
        text="이메일"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
      />
      <FormInput
        label="password"
        text="비밀번호"
        name="password"
        type="password"
        placeholder="••••••••"
        required
      />

      <div className="mt-2 flex flex-col gap-3">
        <button
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Loader /> : "로그인"}
        </button>
      </div>
    </form>
  );
}
