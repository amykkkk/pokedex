"use client";

import { Suspense, useEffect, useState } from "react";
import { fetchAllPokemon, fetchPokemonByType } from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";
import TypeFilter from "@/components/TypeFilter";
import Search from "@/components/SearchBox";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const type = searchParams.get("t") || "";
  const curPage = Number(searchParams.get("p")) || 1;
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const offset = (curPage - 1) * ITEMS_PER_PAGE;
        const data = type
          ? await fetchPokemonByType(type)
          : await fetchAllPokemon();

        const filtered = data.filter((p: any) =>
          p.name.toLowerCase().includes(search.toLowerCase()),
        );

        const paginated = filtered.slice(offset, offset + ITEMS_PER_PAGE);

        setTotalItems(filtered.length);
        setPokemonList(paginated);
      } catch (err) {
        setError("데이터를 불러오는데 실패...😭");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, search, curPage]);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">🔥 PokéAPI</h1>
      <Suspense fallback={<div>loading,,,</div>}>
        <Search placeholder="포켓몬 이름 검색" />
      </Suspense>
      <TypeFilter />

      {loading && <p className="text-gray-500">로딩 중입니다...🌀</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {pokemonList.map((p: any) => (
              <PokemonCard
                key={p.name}
                name={p.name}
                image={`https://img.pokemondb.net/sprites/home/normal/${p.name}.png`}
              />
            ))}
          </div>

          <Pagination
            totalItems={totalItems}
            pageItems={ITEMS_PER_PAGE}
            pageCount={5}
          />
        </>
      )}
    </main>
  );
}
