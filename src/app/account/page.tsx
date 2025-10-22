import { createClient } from "@/lib/supabase/server";
import AccountForm from "./account-form";
import { redirect } from "next/navigation";

export default async function Account() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return <AccountForm user={user} />;
}
