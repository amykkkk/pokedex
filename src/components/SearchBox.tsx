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
    <div className="relative mr-auto w-full max-w-xl">
      <input
        type="text"
        className="peer w-full rounded-full border border-gray-300 bg-white py-3 pr-14 pl-5 text-base text-gray-800 placeholder-gray-400 shadow-md focus:border-red-400 focus:ring-2 focus:ring-red-300 focus:outline-none"
        placeholder={placeholder}
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={onSubmit}
        className="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-red-500 shadow-md transition hover:bg-red-600"
      >
        <div className="relative h-5 w-5">
          <span className="absolute inset-0 m-auto h-5 w-5 rounded-full border-4 border-white"></span>
          <span className="absolute top-1 left-1 h-3 w-3 rounded-full bg-white"></span>
        </div>
      </button>
    </div>
  );
}
