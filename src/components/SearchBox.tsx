"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBox({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const q = searchParams.get("q");
  const t = searchParams.get("t") || "";

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`?t=${t}&q=${search}&p=1`);
  };
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        type="text"
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
