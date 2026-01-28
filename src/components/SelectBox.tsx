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
    <div className="text-foreground relative w-[calc(50%-8px)] text-sm md:max-w-32">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-input flex h-8 w-full items-center justify-between gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5"
      >
        {curQuery
          ? options.find(({ value }) => value === curQuery)?.name
          : title}

        {icon ? (
          icon
        ) : (
          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      <ul
        className={`border-input bg-bg absolute z-10 mt-1 max-h-50 w-full overflow-y-scroll rounded-lg border px-1 py-2 shadow-lg transition-all duration-200 ${
          isOpen
            ? "visible scale-100 opacity-100"
            : "invisible scale-95 opacity-0"
        }`}
      >
        {options.map((list) => (
          <li
            key={list.name}
            onClick={() => onSelectChange(list.value)}
            className="hover:bg-card cursor-pointer rounded-xl pl-1.5 leading-8 capitalize transition-colors duration-150"
          >
            {list.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
