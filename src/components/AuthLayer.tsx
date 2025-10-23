"use client";

import { createClient } from "@/lib/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { useEffect } from "react";

export default function AuthLayer() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return null;
}
