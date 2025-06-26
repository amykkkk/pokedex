"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const arr = [
  { name: "A - Z", value: "asc" },
  { name: " Z - A", value: "desc" },
  { name: "ID ⬇️ ", value: "id-asc" },
  { name: "ID ⬆️", value: "id-desc" },
];

export default function SelectBox() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const sort = searchParams.get("s") || "";
  const router = useRouter();

  const onSelectChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("s", sort);
    router.push(`/?${params}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-28">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border border-white/10 bg-zinc-900 px-3 py-1.5 text-sm font-semibold text-gray-300"
      >
        {arr.find(({ value }) => value === sort)?.name}
      </button>
      <ul
        className={`absolute top-full right-0 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 p-1 text-gray-300 shadow-lg backdrop-blur-xl ${isOpen ? "h-auto opacity-100 transition" : "h-0 opacity-0"}`}
      >
        {arr.map((list) => (
          <li
            key={list.name}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-sm hover:bg-blue-500 hover:text-white"
            onClick={() => onSelectChange(list.value)}
          >
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
