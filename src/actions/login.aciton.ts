"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function loginAction(_: unknown, formData: FormData) {
  const supabase = await createServer();

  const obj = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (obj.email === "" || obj.password === "") {
    return {
      status: false,
      data: obj,
      error: "Email and password are required.",
    };
  }

  try {
    const { error } = await supabase.auth.signInWithPassword(obj);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/", "layout");
    return { status: true, data: null, error: "" };
  } catch (err) {
    return {
      status: false,
      data: obj,
      error: `err: ${err}`,
    };
  }
}
