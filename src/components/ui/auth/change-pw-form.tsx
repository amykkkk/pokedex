"use client";

import { ChangePWAction } from "@/actions/change-pw.aciton";
import FormInput from "@/components/common/form-input";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function ChangePWForm() {
  const [state, formAction, isPending] = useActionState(ChangePWAction, null);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (!state.status) {
      return setError(state.error);
    }
    router.push("/");
  }, [state, router]);

  return (
    <form className="space-y-5" action={formAction}>
      <FormInput
        label="password"
        text="New password"
        id="password"
        name="password"
        type="password"
        placeholder="New password"
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

      <div className="mb-4 flex flex-col gap-3">
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          className="bg-primary flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow transition hover:brightness-95"
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Loader className="animate-spin" /> : "Update Password"}
        </button>
      </div>
    </form>
  );
}
