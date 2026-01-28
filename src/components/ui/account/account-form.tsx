"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Avatar from "./avatar";
import FormInput from "@/components/common/form-input";
import Link from "next/link";
import { ChevronRight, Loader, Pencil } from "lucide-react";
import PokemonCard from "@/components/common/pokemon-card";

type IUserInfo = {
  id: string;
  email: string;
  createdAt: string;
  nickname: string;
  img: string;
  like: { name: string; id: number }[];
};

export default function AccountForm({ userInfo }: { userInfo: IUserInfo }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    nickname: userInfo.nickname,
    img: userInfo.img,
  });

  const updateProfile = async () => {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: userInfo.id,
        nickname: profile.nickname,
        avatar_url: profile.img,
      });

      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card mx-auto max-w-lg rounded-2xl border p-8 shadow-lg">
      <h2 className="text-accent mb-8 text-center text-2xl font-bold">
        ⚙️ Account Settings
      </h2>

      <Avatar
        uid={userInfo.id}
        url={profile.img}
        size={150}
        loading={loading}
        onUpload={(url) => {
          setProfile({ ...profile, img: url });
          updateProfile();
        }}
      />

      <FormInput
        label="email"
        text="Email"
        id="email"
        type="text"
        value={userInfo.email}
        disabled
      />

      <FormInput
        label="created_at"
        text=" Created At"
        id="created_at"
        type="text"
        value={userInfo.createdAt.split("T")[0]}
        disabled
      />
      <div className="grid grid-cols-[1fr_auto] items-center justify-items-stretch gap-3">
        <FormInput
          label="nickname"
          text=" Nickname"
          id="nickname"
          type="text"
          value={profile.nickname}
          onChange={(e) => setProfile({ ...profile, nickname: e.target.value })}
        />

        <button
          className="bg-accent mt-2 h-9.5 cursor-pointer rounded-lg p-3 font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          onClick={() => updateProfile()}
          disabled={loading}
        >
          {loading ? (
            <Loader size={12} className="animate-spin" />
          ) : (
            <Pencil size={12} />
          )}
        </button>
      </div>

      <p className="text-text mb-2 flex items-center justify-between text-sm font-semibold">
        Like List
        <Link href="/account/like" className="text-text text-xs">
          More <ChevronRight size={14} className="inline-block" />
        </Link>
      </p>

      <div className="w-full overflow-x-auto">
        <div className="flex min-w-3xl flex-nowrap gap-4 py-4">
          {userInfo.like.length === 0
            ? "There is no liked pokemon."
            : userInfo.like.map((p) => (
                <PokemonCard
                  key={p.name}
                  {...p}
                  isLiked={true}
                  isLoggedIn={true}
                />
              ))}
        </div>
      </div>

      <div className="text-text mt-6 text-center text-xs">
        <Link href="/auth/change-pw">비밀번호 재설정</Link>
      </div>
    </div>
  );
}
