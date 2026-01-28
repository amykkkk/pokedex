"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const q = searchParams.get("query");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    if (!search || q === search) return;

    const params = new URLSearchParams(searchParams);
    params.set("query", search);
    router.push(`/?${params}`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="relative mr-auto w-full md:max-w-xl">
      <input
        type="text"
        className="text-foreground border-border bg-bg focus:border-primary h-8 w-full rounded-md border px-4 py-2 pl-3 text-sm placeholder-gray-400 focus:outline-none"
        placeholder={placeholder}
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={onSubmit}
        className="absolute top-1/2 right-2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-red-500 shadow-md transition"
      >
        <div className="relative h-5 w-5">
          <span className="border-bg absolute inset-0 m-auto h-4.5 w-4.5 rounded-full border-4"></span>
          <span className="bg-bg absolute top-1/2 left-1/2 h-2 w-2 -translate-1/2 rounded-full"></span>
        </div>
      </button>
    </div>
  );
}
