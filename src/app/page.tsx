"use client";

import { useEffect, useState } from "react";
import { fetchAllPokemon, fetchPokemonByType } from "@/lib/api";
import PokemonCard from "@/components/PokemonCard";
import TypeFilter from "@/components/TypeFilter";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);
  const [type, setType] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = type
        ? await fetchPokemonByType(type)
        : await fetchAllPokemon();

      setPokemonList(data);
    };

    fetchData();
  }, [type]);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">🔥 Search</h1>
      <TypeFilter onSelect={setType} />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {pokemonList.map((p: any) => (
          <PokemonCard
            key={p.name}
            name={p.name}
            image={`https://img.pokemondb.net/sprites/home/normal/${p.name}.png`}
          />
        ))}
      </div>
    </main>
  );
}
