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
    <div className="bg-card border-border mx-auto mt-10 max-w-lg rounded-2xl border p-8 shadow-lg">
      <h2 className="text-accent mb-8 text-center text-2xl font-bold">
        ⚙️ Account Settings
      </h2>

      <div className="mb-4">
        <label
          htmlFor="email"
          className="text-text mb-1 block text-sm font-semibold"
        >
          Email
        </label>
        <input
          id="email"
          type="text"
          value={user?.email}
          disabled
          className="border-border bg-search focus:ring-accent/50 w-full rounded-lg border px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:outline-none dark:text-gray-200"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="created_at"
          className="text-text mb-1 block text-sm font-semibold"
        >
          Created At
        </label>
        <input
          id="created_at"
          type="text"
          value={user?.created_at}
          disabled
          className="border-border bg-search focus:ring-accent/50 w-full rounded-lg border px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:outline-none dark:text-gray-200"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="nickname"
          className="text-text mb-1 block text-sm font-semibold"
        >
          Nickname
        </label>
        <input
          id="nickname"
          type="text"
          value={nickname || ""}
          onChange={(e) => setNickname(e.target.value)}
          className="border-border bg-search focus:ring-accent/50 w-full rounded-lg border px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:outline-none dark:text-gray-100"
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

      <div className="mb-4">
        <button
          className="bg-accent w-full rounded-lg py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          onClick={() => updateProfile({ nickname, avatar_url })}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>

      <div className="mt-6">
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="border-border text-text hover:bg-border/20 w-full rounded-lg border bg-transparent py-2 text-sm font-semibold transition"
          >
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
