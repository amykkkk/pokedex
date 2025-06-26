"use client";

import { fetchPokemonAllTypes } from "@/lib/api";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TypeFilter() {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const t = searchParams.get("t");
  const router = useRouter();

  useEffect(() => {
    const loadTypes = async () => {
      setLoading(true);

      try {
        const data = await fetchPokemonAllTypes();
        const filtered = data.filter(
          (t: any) => t.name !== "unknown" && t.name !== "shadow",
        );
        setTypes(filtered.map((t: any) => t.name));
      } catch (err) {
        console.error("타입 리스트 로딩 실패!!😭", err);
      } finally {
        setLoading(false);
      }
    };
    loadTypes();
  }, []);

  const handleType = (type: string) => {
    if (!type || t === type) return;

    const params = new URLSearchParams(searchParams);
    params.set("t", type);
    router.push(`/?${params}`);
  };

  if (loading) return <p>타입 로딩 중입니다...🌀</p>;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <button
        onClick={() => handleType("")}
        className="rounded bg-gray-300 px-2 py-1 transition hover:bg-gray-400"
      >
        전체 보기
      </button>

      {types.map((type) => (
        <button
          key={type}
          onClick={() => handleType(type)}
          className={`rounded-full px-3 py-1 text-sm text-white transition hover:bg-blue-400 ${t === type ? "bg-red-500" : "bg-blue-300"}`}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
