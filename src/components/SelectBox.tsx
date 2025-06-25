"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const arr = [
  { name: "A - Z", value: "asc" },
  { name: " Z - A", value: "id-desc" },
  { name: "Lowest Num", value: "id-asc" },
  { name: "Highest Num", value: "id-desc" },
];

export default function SelectBox() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const sort = searchParams.get("s") || "asc";
  const router = useRouter();

  const onSelectChange = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("s", sort);
    router.push(`?${params}`);
    setIsOpen(false);
  };

  return (
    <div className="relative w-28">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-1.5 text-xs font-semibold text-gray-300"
      >
        {arr.find(({ value }) => value === sort)?.name}
      </button>
      <ul
        className={`absolute top-full right-0 w-full overflow-hidden rounded-xl border border-gray-700 bg-gray-950 text-gray-300 shadow-lg backdrop-blur-xl ${isOpen ? "h-auto opacity-100 transition" : "h-0 opacity-0"}`}
      >
        {arr.map((list) => (
          <li
            key={list.name}
            className="cursor-pointer rounded px-3 py-2 text-xs hover:bg-blue-500 hover:text-white"
            onClick={() => onSelectChange(list.value)}
          >
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
