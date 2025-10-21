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
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.error("Error downloading image: ", error);
      }
    }
    if (url) downloadImage(url);
  }, [url, supabase]);

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
        className={`ring-accent h-full w-full overflow-hidden rounded-full shadow-md ring-2 ${!avatarUrl && "bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300"}`}
      >
        {avatarUrl && (
          <Image
            width={size}
            height={size}
            src={avatarUrl}
            alt={"Avatar"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <label
        htmlFor="single"
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
