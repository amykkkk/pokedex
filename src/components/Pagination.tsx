"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  totalItems,
  pageItems,
  pageCount,
}: {
  totalItems: number;
  pageItems: number;
  pageCount: number;
}) {
  const searchParams = useSearchParams();
  const p = Number(searchParams.get("page")) || 1;
  const router = useRouter();

  const totalPages = Math.ceil(totalItems / pageItems);
  const pageGroup = Math.ceil(p / pageCount);
  const startIdx = (pageGroup - 1) * pageCount + 1;
  const pageArr = Array.from({ length: totalPages }, (_, i) => i + 1).splice(
    startIdx - 1,
    pageCount,
  );

  const goToPage = (num: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", num.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <ul className="mt-10 flex items-center justify-center gap-2">
      {pageGroup !== 1 && (
        <li>
          <button
            onClick={() => goToPage(startIdx - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-red-500 hover:text-white"
          >
            <ChevronLeft />
          </button>
        </li>
      )}
      {pageArr.map((page) => (
        <li key={page}>
          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full font-semibold transition ${
              p === page
                ? "bg-red-500 text-white shadow-md"
                : "bg-gray-100 text-gray-600 hover:bg-red-100"
            }`}
            onClick={() => goToPage(page)}
          >
            {page}
          </button>
        </li>
      ))}
      {startIdx + pageCount - 1 < totalPages && (
        <li>
          <button
            onClick={() => goToPage(startIdx + pageCount)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600 transition hover:bg-red-500 hover:text-white"
          >
            <ChevronRight />
          </button>
        </li>
      )}
    </ul>
  );
}
