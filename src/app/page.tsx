"use client";

import { Suspense, useEffect, useState } from "react";
import {
  fetchAllPokemon,
  fetchPokemonAllTypes,
  fetchPokemonByType,
} from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";
import Search from "@/components/SearchBox";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import SelectBox from "@/components/SelectBox";
import { SlidersHorizontal } from "lucide-react";

const arr = [
  { name: "A - Z", value: "asc" },
  { name: " Z - A", value: "desc" },
  { name: "ID ⬇️ ", value: "id-asc" },
  { name: "ID ⬆️", value: "id-desc" },
];

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const type = searchParams.get("t") || "";
  const curPage = Number(searchParams.get("p")) || 1;
  const sort = searchParams.get("s") || "";
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const loadTypes = async () => {
      setLoading(true);

      try {
        const data = await fetchPokemonAllTypes();
        const filtered = data
          .filter((t: any) => t.name !== "unknown" && t.name !== "shadow")
          .map((t: any) => ({ name: t.name, value: t.name }));

        setTypes(filtered);
      } catch (err) {
        console.error("타입 리스트 로딩 실패!!😭", err);
      } finally {
        setLoading(false);
      }
    };
    loadTypes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const data = type
          ? await fetchPokemonByType(type)
          : await fetchAllPokemon();

        const filtered = data
          .filter((p: any) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((p: any) => ({
            name: p.name,
            id: Number(p.url.split("/")[6]),
          }));

        const sorted = filtered.sort((a: any, b: any) =>
          sort === "asc"
            ? a.name.localeCompare(b.name)
            : sort === "desc"
              ? b.name.localeCompare(a.name)
              : sort === "id-desc"
                ? b.id - a.id
                : a.id - b.id,
        );

        const offset = (curPage - 1) * ITEMS_PER_PAGE;
        const paginated = sorted.slice(offset, offset + ITEMS_PER_PAGE);

        setTotalItems(filtered.length);
        setPokemonList(paginated);
      } catch (err) {
        setError("데이터를 불러오는데 실패...😭");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, search, curPage, sort]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-pink-50 px-6 py-10 sm:px-12 md:px-24">
      <h1 className="mb-8 text-center text-4xl font-black text-gray-800">
        🔥 Pokédex
      </h1>

      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <Suspense fallback={<div>로딩 중입니다...</div>}>
          <Search placeholder="포켓몬 이름 검색" />

          <SelectBox options={types} query={"t"} title={"Type"} />
          <SelectBox
            options={arr}
            query={"s"}
            title={"Sort"}
            icon={<SlidersHorizontal />}
          />
        </Suspense>
      </div>

      {loading && (
        <p className="animate-pulse text-center text-gray-500">
          로딩 중입니다...🌀
        </p>
      )}
      {error && (
        <p className="text-center font-semibold text-red-500">{error}</p>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {pokemonList.map((p: any) => (
              <PokemonCard key={p.name} name={p.name} id={p.id} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination
              totalItems={totalItems}
              pageItems={ITEMS_PER_PAGE}
              pageCount={5}
            />
          </div>
        </>
      )}
    </main>
  );
}
