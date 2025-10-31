"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./avatar";
import { useUserInfoStore } from "@/stores/auth-store";

export default function AccountForm() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    img: "",
  });

  const { id, email, nickname, profileImage, createdAt, setUser } =
    useUserInfoStore();

  async function updateProfile({ name, img }: { name: string; img: string }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        // id: user?.id as string,
        nickname: name,
        avatar_url: img,
        // updated_at: new Date().toISOString(),
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
          value={email ?? ""}
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
          value={createdAt ? createdAt.split("T")[0] : ""}
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
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="border-border bg-search focus:ring-accent/50 w-full rounded-lg border px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:outline-none dark:text-gray-100"
        />
      </div>

      <Avatar
        uid={id}
        url={profileImage}
        size={150}
        onUpload={(url) => {
          updateProfile({ ...profile });
        }}
      />

      <div className="mb-4">
        <button
          className="bg-accent w-full rounded-lg py-2 text-sm font-semibold text-white shadow-md transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
          onClick={() => updateProfile({ ...profile })}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </div>
  );
}
