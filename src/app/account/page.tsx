import { createServer } from "@/lib/supabase/server";
import AccountForm from "./account-form";

export default async function Account() {
  return <AccountForm />;
}
