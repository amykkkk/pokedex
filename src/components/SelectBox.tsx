"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { IType } from "@/lib/api";

export default function SelectBox({
  options,
  query,
  icon,
  title,
}: {
  options: IType[];
  query: string;
  icon?: React.ReactElement;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const curQuery = searchParams.get(query);
  const router = useRouter();

  const onSelectChange = (sort: string) => {
    if (!sort || curQuery === sort) return;

    const params = new URLSearchParams(searchParams);
    params.set(query, sort);
    router.push(`/?${params}`);

    setIsOpen(false);
  };

  return (
    <div className="relative w-32 text-sm font-medium text-gray-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-4 py-2 shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        {curQuery
          ? options.find(({ value }) => value === curQuery)?.name
          : title}

        {icon ? (
          icon
        ) : (
          <ChevronDown
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      <ul
        className={`absolute z-10 mt-1 max-h-50 w-full overflow-y-scroll rounded-xl border border-gray-200 bg-white py-1 shadow-lg transition-all duration-200 ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        {options.map((list) => (
          <li
            key={list.name}
            onClick={() => onSelectChange(list.value)}
            className="cursor-pointer rounded-lg px-4 py-2 transition-colors duration-150 hover:bg-blue-100"
          >
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
