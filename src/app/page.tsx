"use client";

import { Suspense, useEffect, useState } from "react";
import {
  fetchAllPokemon,
  fetchPokemonAllTypes,
  fetchPokemonByType,
  IPokemon,
  IType,
} from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";
import Search from "@/components/SearchBox";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/Pagination";
import SelectBox from "@/components/SelectBox";
import { SlidersHorizontal } from "lucide-react";
import CardLoading from "@/components/loading/CardLoading";

const arr = [
  { name: "A - Z", value: "asc" },
  { name: " Z - A", value: "desc" },
  { name: "ID ⬇️ ", value: "id-asc" },
  { name: "ID ⬆️", value: "id-desc" },
];

export default function Home() {
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [types, setTypes] = useState<IType[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  const type = searchParams.get("t") || "";
  const curPage = Number(searchParams.get("p")) || 1;
  const sort = searchParams.get("s") || "";
  const ITEMS_PER_PAGE = 20;

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const data: IType[] = await fetchPokemonAllTypes();
        const filtered = data
          .filter((t) => t.name !== "unknown" && t.name !== "shadow")
          .map((t) => ({ name: t.name, value: t.name }));

        setTypes(filtered);
      } catch (err) {
        console.error("타입 리스트 로딩 실패!!😭", err);
      }
    };
    loadTypes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: IPokemon[] = type
          ? await fetchPokemonByType(type)
          : await fetchAllPokemon();

        const filtered = data
          .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
          .map((p) => ({
            name: p.name,
            id: (p.url && Number(p.url.split("/")[6])) || 0,
          }));

        const sorted = filtered.sort((a, b) =>
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
        console.error("데이터를 불러오는데 실패...😭", err);
      }
    };

    fetchData();
  }, [type, search, curPage, sort]);

  return (
    <main className="bg-gradient-to-b from-blue-50 via-white to-pink-50 px-6 sm:px-12 md:px-24">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <Suspense
          fallback={
            <div className="skeleton mr-auto h-10 w-full max-w-xl md:w-1/2" />
          }
        >
          <Search placeholder="포켓몬 이름 검색" />
        </Suspense>

        {types && <SelectBox options={types} query={"t"} title={"Type"} />}
        {pokemonList && (
          <SelectBox
            options={arr}
            query={"s"}
            title={"Sort"}
            icon={<SlidersHorizontal />}
          />
        )}
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        <Suspense fallback={<CardLoading limit={ITEMS_PER_PAGE} />}>
          {pokemonList.map((p) => (
            <PokemonCard key={p.name} name={p.name} id={p.id} isLiked={false} />
          ))}
        </Suspense>
      </div>

      {totalItems !== 0 && (
        <div className="mt-10">
          <Pagination
            totalItems={totalItems}
            pageItems={ITEMS_PER_PAGE}
            pageCount={5}
          />
        </div>
      )}
    </main>
  );
}
