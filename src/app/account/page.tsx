import { createServer } from "@/lib/supabase/server";
import AccountForm from "@/components/ui/account/account-form";
import { getUserLikes } from "@/lib/get-user-likes";

export default async function Account() {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const {
    data: profile,
    error,
    status,
  } = await supabase.from("profiles").select().eq("id", user?.id).single();

  if (error && status !== 406) {
    return console.log(error);
  }

  const { likesList } = await getUserLikes();
  const likesArray = Object.entries(likesList).map(([id, value]) => ({
    name: value.name,
    id: Number(id),
  }));

  return (
    <AccountForm
      userInfo={{
        id: user?.id || "",
        email: user?.email || "",
        createdAt: profile?.created_at || "",
        nickname: profile?.nickname || "",
        img: profile?.avatar_url || "",
        like: likesArray || [],
      }}
    />
  );
}
