"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import FormInput from "@/components/common/form-input";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

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
        id: user?.id,
        nickname: name,
        avatar_url: img,
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-card border-border mx-auto mt-10 max-w-lg rounded-2xl border p-8 shadow-lg">
      <h2 className="text-accent mb-8 text-center text-2xl font-bold">
        ⚙️ Account Settings
      </h2>

      <Avatar
        uid={user ? user.id : ""}
        url={profile.img}
        size={150}
        onUpload={(url) => {
          updateProfile({ img: url });
        }}
      />

      <FormInput
        label="email"
        text="Email"
        id="email"
        type="text"
        value={user?.email ?? ""}
        disabled
      />

      <FormInput
        label="created_at"
        text=" Created At"
        id="created_at"
        type="text"
        value={profile.createdAt.split("T")[0]}
        disabled
      />
      <FormInput
        label="nickname"
        text=" Nickname"
        id="nickname"
        type="text"
        value={profile.nickname ?? ""}
        onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
      />

      <div className="mt-5 flex flex-wrap items-center justify-between text-xs text-[var(--color-text)]/50">
        <p className="text-text mb-2 block text-sm font-semibold">Like List</p>
        <Link href="/account/like">
          More <ChevronRight size={14} className="inline-block" />
        </Link>
        <div className="w-full">list</div>
      </div>

      <div className="mt-4">
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

      <div className="mt-5 text-center text-xs text-[var(--color-text)]/50">
        <Link href="/auth/change-pw">비밀번호 재설정</Link>
      </div>
    </div>
  );
}
