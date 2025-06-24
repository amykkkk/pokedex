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
    const params = new URLSearchParams(searchParams.toString());
    params.set("p", num.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <ul className="mt-6 flex justify-center gap-2 text-sm">
      {pageGroup !== 1 && (
        <li>
          <button
            onClick={() => goToPage(startIdx - 1)}
            className="cursor-pointer rounded px-2 py-1"
          >
            &lt;
          </button>
        </li>
      )}
      {pageArr.map((page) => (
        <li key={page}>
          <button
            className={`rounded px-3 py-1 ${p === page ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}
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
            className="cursor-pointer rounded px-2 py-1"
          >
            &gt;
          </button>
        </li>
      )}
    </ul>
  );
}
