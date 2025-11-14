"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { Link } from "lucide-react";

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    nickname: "",
    img: "",
    createdAt: "",
  });

  useEffect(() => {
    if (!user) return;

    const checkLoginStatus = async () => {
      const { data, error, status } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        return console.log(error);
      }

      if (!data) return;

      setProfile({
        nickname: data.nickname,
        img: data.avatar_url,
        createdAt: data.created_at,
      });
    };
    checkLoginStatus();
  }, [user]);

  async function updateProfile({ name, img }: { name?: string; img: string }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        nickname: name,
        avatar_url: img,
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
          value={user?.email ?? ""}
          disabled
          className="border-border bg-search focus:ring-accent/50 w-full rounded-lg border px-3 py-2 text-sm text-gray-600 focus:ring-2 focus:outline-none dark:text-gray-200"
        />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-[var(--color-text)]/80">
          비밀번호
        </label>
        <Link href="{{ .SiteURL }}/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/account/change_pw">
          비밀번호 재설정
        </Link>
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
          value={profile.createdAt.split("T")[0]}
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
          value={profile.nickname ?? ""}
          onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
          className="border-border bg-search focus:ring-accent/50 w-full rounded-lg border px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:outline-none dark:text-gray-100"
        />
      </div>

      <Avatar
        uid={user ? user.id : ""}
        url={profile.img}
        size={150}
        onUpload={(url) => {
          updateProfile({ img: url });
        }}
      />

      <div className="mb-4">
        <button
          className="bg-accent w-full rounded-lg py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          onClick={() =>
            updateProfile({ name: profile.nickname, img: profile.img })
          }
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
}
