"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import FormInput from "@/components/common/form-input";
import Link from "next/link";
import { ChevronRight, Loader, Pencil } from "lucide-react";
import PokemonCard from "@/components/PokemonCard";
import useCurrentUser from "@/hooks/use-current-user";

export default function AccountForm() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const { profile, setProfile } = useCurrentUser();

  async function updateProfile({
    name,
    img,
  }: {
    name: string | null;
    img: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: profile.id,
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
    <div className="bg-card border-border mx-auto max-w-lg rounded-2xl border p-8 shadow-lg">
      <h2 className="text-accent mb-8 text-center text-2xl font-bold">
        ⚙️ Account Settings
      </h2>

      <Avatar
        uid={profile.id}
        url={profile.img}
        size={150}
        onUpload={(url) => {
          setProfile({ ...profile, img: url });
          updateProfile({ name: profile.nickname, img: url });
        }}
      />

      <FormInput
        label="email"
        text="Email"
        id="email"
        type="text"
        value={profile.email}
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
      <div className="grid grid-cols-[1fr_auto] items-center justify-items-stretch gap-3">
        <FormInput
          label="nickname"
          text=" Nickname"
          id="nickname"
          type="text"
          value={profile.nickname ?? ""}
          onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
        />

        <button
          className="bg-accent mt-2 h-9.5 rounded-lg p-3 font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          onClick={() =>
            updateProfile({ img: profile.img, name: profile.nickname })
          }
          disabled={loading}
        >
          {loading ? <Loader size={12} /> : <Pencil size={12} />}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between text-xs text-[var(--color-text)]/50">
        <p className="text-text mb-2 block text-sm font-semibold">Like List</p>
        <Link href="/account/like">
          More <ChevronRight size={14} className="inline-block" />
        </Link>
        <div className="w-full">
          {profile.like.length === 0
            ? "There is no liked pokemon."
            : profile.like.map((p) => (
                <PokemonCard key={p.name} name={p.name} id={p.id} />
              ))}
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-[var(--color-text)]/50">
        <Link href="/auth/change-pw">비밀번호 재설정</Link>
      </div>
    </div>
  );
}
