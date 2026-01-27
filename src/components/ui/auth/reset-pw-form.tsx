"use client";

import { ResetPWAction } from "@/actions/reset-pw.aciton";
import FormInput from "@/components/common/form-input";
import { Loader } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

export default function ResetPwForm() {
  const [state, formAction, isPending] = useActionState(ResetPWAction, null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (state && !state.status) {
      return setError(state.error);
    }
  }, [state]);

  return (
    <>
      {state && state.status ? (
        <div className="mt-6">
          <p className="text-center text-sm leading-relaxed text-gray-500">
            If you registered using your email and password, you will receive a
            password reset email.
          </p>
        </div>
      ) : (
        <form className="space-y-5" action={formAction}>
          <FormInput
            label="email"
            text="Email"
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />

          <div className="mb-4 flex flex-col gap-3">
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
              type="submit"
              disabled={isPending}
            >
              {isPending ? <Loader /> : "Reset Password"}
            </button>
          </div>
        </form>
      )}
    </>
  );
}
