"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function signUpAction(_: unknown, formData: FormData) {
  const supabase = await createServer();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPW = formData.get("repeat-password") as string;

  if (email === "" || password === "") {
    return {
      status: false,
      data: { email, password },
      error: "Email and password are required.",
    };
  }

  if (password !== repeatPW) {
    return {
      status: false,
      data: { email, password },
      error: "Passwords do not match.",
    };
  }

  try {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname: "",
          avatar_url: "",
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/auth/login", "layout");
    return { status: true, data: null, error: "" };
  } catch (err) {
    return {
      status: false,
      data: { email, password },
      error: `err: ${err}`,
    };
  }
}
