"use client";

import { fetchPokemonAllTypes } from "@/lib/api";
import { useEffect, useState } from "react";

export default function TypeFilter({
  onSelect,
}: {
  onSelect: (type: string) => void;
}) {
  const [types, setTypes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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

  if (loading) return <p>타입 로딩 중입니다...🌀</p>;

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("")}
        className="rounded bg-gray-300 px-2 py-1 transition hover:bg-gray-400"
      >
        전체 보기
      </button>

      {types.map((type) => (
        <button
          key={type}
          onClick={() => onSelect(type)}
          className={`rounded-full bg-blue-300 px-3 py-1 text-sm text-white transition hover:bg-blue-400`}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
