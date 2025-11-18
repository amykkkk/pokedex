"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function ResetPWAction(_: any, formData: FormData) {
  const supabase = await createServer();

  const email = formData.get("email") as string;

  if (!email) {
    return {
      status: false,
      error: "Email is required.",
    };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/auth/reset-pw", "layout");
    return { status: true, error: "" };
  } catch (err) {
    return {
      status: false,
      error: `err: ${err}`,
    };
  }
}
