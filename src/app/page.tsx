"use client";

import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
      const data = await res.json();

      const list = data.results.map((pokemon: any, i: number) => ({
        name: pokemon.name,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          i + 1
        }.png`,
      }));

      setPokemonList(list);
    };

    fetchData();
  }, []);

  return (
    <main className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 md:grid-cols-4">
      {pokemonList.map((p) => (
        <PokemonCard key={p.name} name={p.name} image={p.image} />
      ))}
    </main>
  );
}
