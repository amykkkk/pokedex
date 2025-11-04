"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function loginAction(_: any, formData: FormData) {
  const supabase = await createServer();

  const obj = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (obj.email === "" || obj.password === "") {
    return {
      status: false,
      error: "Email and password are required.",
    };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword(obj);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/login", "layout");
    return { status: true, error: null };
  } catch (err) {
    return {
      status: false,
      error: err,
    };
  }
}
