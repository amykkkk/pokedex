"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function ChangePWAction(_: any, formData: FormData) {
  const supabase = await createServer();

  const password = formData.get("password") as string;
  const repeatPW = formData.get("repeat-password") as string;

  if (password !== repeatPW) {
    return {
      status: false,
      error: "Passwords do not match.",
    };
  }

  try {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/auth/chang-pw", "layout");
    return { status: true, error: "" };
  } catch (err) {
    return {
      status: false,
      error: `err: ${err}`,
    };
  }
}
