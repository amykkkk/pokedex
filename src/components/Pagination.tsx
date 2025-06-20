"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
  const p = Number(searchParams.get("p")) || 1;
  const router = useRouter();

  const totalPages = Math.ceil(totalItems / pageItems);
  const pageGroup = Math.ceil(p / pageCount);
  const startIdx = (pageGroup - 1) * pageCount + 1;
  const pageArr = Array.from({ length: totalPages }, (_, i) => i + 1).splice(
    startIdx - 1,
    pageCount,
  );

  const goToPage = (num: number) => {
    router.push(`/?p=${num}`);
  };

  return (
    <ul className="mt-6 flex justify-center gap-2">
      <li onClick={() => goToPage(startIdx - pageCount)}>&lt;</li>
      {pageArr.map((_, i) => (
        <li
          key={i}
          className={`rounded px-3 py-1 ${p === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
          onClick={() => goToPage(i + 1)}
        >
          {i + 1}
        </li>
      ))}
      <li onClick={() => goToPage(startIdx + pageCount)}>&gt;</li>
    </ul>
  );
}
