import { createServer } from "@/lib/supabase/server";
import AccountForm from "@/components/ui/account/account-form";

export default async function Account() {
  return <AccountForm />;
}
