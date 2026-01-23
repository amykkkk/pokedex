"use server";

import { createServer } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function toggleLikeAction(pokemonId: number, pokemonName: string) {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profile_likes")
    .select("likes")
    .eq("user_id", user?.id)
    .single();

  if (error) console.log(`Error toggleLikeAction: ${error}`);

  const { ...curLikes } = (data?.likes ?? {}) as Record<
    string,
    { name: string }
  >;
  const key = String(pokemonId);

  if (curLikes[key]) {
    delete curLikes[key];
  } else {
    curLikes[key] = {
      name: pokemonName,
    };
  }

  await supabase.from("profile_likes").upsert({
    user_id: user?.id,
    likes: curLikes,
  });

  revalidatePath("/");
  revalidatePath("/account");
}
