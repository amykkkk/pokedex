"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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
        className="w-full rounded-lg border border-gray-700 bg-gray-950 px-3 py-1.5 font-semibold text-gray-300"
      >
        {sort}
      </button>
      <ul
        className={`absolute top-full right-0 w-full overflow-hidden rounded-xl border border-gray-700 bg-gray-950 text-gray-300 shadow-lg backdrop-blur-xl ${isOpen ? "h-auto opacity-100 transition" : "h-0 opacity-0"}`}
      >
        <li
          className="cursor-pointer rounded px-3 py-2 text-xs hover:bg-blue-500 hover:text-white"
          onClick={() => onSelectChange("321")}
        >
          Lowest Num
        </li>
        <li
          onClick={() => onSelectChange("123")}
          className="cursor-pointer rounded px-3 py-2 text-xs hover:bg-blue-500 hover:text-white"
        >
          Highest Num
        </li>
        <li
          onClick={() => onSelectChange("asc")}
          className="cursor-pointer rounded px-3 py-2 text-xs hover:bg-blue-500 hover:text-white"
        >
          A - Z
        </li>
        <li
          onClick={() => onSelectChange("desc")}
          className="cursor-pointer rounded px-3 py-2 text-xs hover:bg-blue-500 hover:text-white"
        >
          Z - A
        </li>
      </ul>
    </div>
  );
}
