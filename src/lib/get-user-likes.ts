"use server";

import { createServer } from "./supabase/server";

export async function getUserLikes() {
  const supabase = await createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      isLoggedIn: false,
      likesList: {},
    };

  const { data } = await supabase
    .from("profile_likes")
    .select("likes")
    .eq("user_id", user.id)
    .single();

  return {
    isLoggedIn: true,
    likesList: (data?.likes ?? {}) as Record<string, { name: string }>,
  };
}
