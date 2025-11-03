"use client";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore, useUserInfoStore } from "@/stores/auth-store";
import { useEffect } from "react";

export default function useLoggedIn() {
  const { setUser } = useUserInfoStore();
  const { isLogin, setIsLogin } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const {
          data: profiles,
          error,
          status,
        } = await supabase.from("profiles").select().eq("id", user.id).single();

        if (error && status !== 406) {
          return console.log(error);
        }
        if (!profiles) return;

        setUser({
          id: profiles.id,
          email: user.user_metadata.email,
          nickname: profiles.nickname,
          profileImage: profiles.avatar_url,
          createdAt: profiles.create_at,
        });

        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    };
    checkLoginStatus();
  }, [isLogin]);

  return isLogin;
}
