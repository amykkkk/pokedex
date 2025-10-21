"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    if (!user?.id) {
      setNickname(null);
      setAvatarUrl(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`nickname, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        console.error(error);
        throw error;
      }

      if (data) {
        setNickname(data.nickname);
        setAvatarUrl(data.avatar_url);
      }
    } catch (err) {
      console.error("Error loading user data!", err);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    nickname,
    avatar_url,
  }: {
    nickname: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        nickname,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="email">created_at</label>
        <input id="created_at" type="text" value={user?.created_at} disabled />
      </div>
      <div>
        <label htmlFor="nickname">nickname</label>
        <input
          id="nickname"
          type="text"
          value={nickname || ""}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <Avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onUpload={(url) => {
          setAvatarUrl(url);
          updateProfile({ nickname, avatar_url: url });
        }}
      />
      <div>
        <button
          className="button primary block"
          onClick={() => updateProfile({ nickname, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
