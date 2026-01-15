"use client";

import { createClient } from "@/lib/supabase/client";
import { useCallback, useEffect, useState } from "react";

type IProfileType = {
  isLogin: boolean;
  id: string;
  email: string;
  nickname: string | null;
  img: string | null;
  createdAt: string;
  like: { name: string; id?: number }[];
};

export default function useCurrentUser() {
  const supabase = createClient();
  const [profile, setProfile] = useState<IProfileType>({
    isLogin: false,
    id: "",
    email: "",
    nickname: "",
    img: "",
    createdAt: "",
    like: [],
  });

  const fetchCurrentUser = useCallback(async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error, status } = await supabase
        .from("profiles")
        .select("nickname,avatar_url,created_at")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (!data) return;
      setProfile({
        isLogin: true,
        id: user.email as string,
        email: user.email as string,
        nickname: data.nickname,
        img: data.avatar_url,
        createdAt: data.created_at,
        like: [],
      });
    } catch (error) {
      console.log(error);
    }
  }, [supabase]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return { profile, setProfile };
}
