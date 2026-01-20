import { IPokemon, fetchPokemonByType, fetchAllPokemon } from "@/lib/api";
import { cache } from "react";

export const getPokemonList = cache(
  async ({
    type,
    page,
    sort,
    query,
    limit,
  }: {
    type: string;
    page: number;
    sort: string;
    query: string;
    limit: number;
  }) => {
    const data: IPokemon[] = type
      ? await fetchPokemonByType(type)
      : await fetchAllPokemon();

    if (!data) console.log("Error fetchData");

    const filtered = data
      .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
      .map((p) => ({
        name: p.name,
        id: Number(p.url?.split("/")[6]),
      }));

    const sorted = [...filtered].sort((a, b) => {
      switch (sort) {
        case "asc":
          return a.name.localeCompare(b.name);
        case "desc":
          return b.name.localeCompare(a.name);
        case "id-desc":
          return b.id - a.id;
        case "id-asc":
        default:
          return a.id - b.id;
      }
    });

    const offset = (page - 1) * limit;

    return {
      list: sorted.slice(offset, offset + limit),
      total: filtered.length,
    };
  },
);
