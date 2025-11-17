"use client";

import { createClient } from "@/lib/supabase/client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function Avatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
}) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      console.error("Error uploading avatar: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative m-auto mb-4" style={{ width: size, height: size }}>
      <div
        className={`ring-accent h-full w-full overflow-hidden rounded-full shadow-md ring-2 ${!url && "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300"}`}
      >
        {url && (
          <Image
            width={size}
            height={size}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${url}`}
            alt="Profile Image"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <label
        htmlFor="avatarUpload"
        className={`bg-accent absolute right-1 bottom-1 flex cursor-pointer items-center justify-center rounded-full p-2 text-white shadow-md transition-all duration-300 ${uploading ? "cursor-not-allowed opacity-50" : "hover:bg-accent/90 hover:scale-110"} `}
      >
        <Plus size={14} />
        <input
          id="avatarUpload"
          type="file"
          accept="image/*"
          disabled={uploading}
          onChange={uploadAvatar}
          className="hidden"
        />
      </label>
    </div>
  );
}
