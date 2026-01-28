export type IPokemon = {
  name: string;
  id: number;
  url?: string;
};

export const fetchAllPokemon = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302`, {
    next: {
      revalidate: 86400, // 24 hours
    },
  });

  if (!res.ok) throw new Error("Failed to fetch Pokémon");

  const data = await res.json();
  return data.results;
};

export type IPokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
};

export const fetchPokemonDetail = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return await res.json();
};

export type IType = {
  name: string;
  value: string;
};

export const fetchPokemonByType = async (type: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();

  return data.pokemon.map((p: { pokemon: IPokemon }) => p.pokemon);
};

export const fetchPokemonAllTypes = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/type")
    .then((response) => {
      if (!response.ok)
        console.log("Error fetchPokemonAllTypes:", response.status);
      return response.json();
    })
    .then((data) => data.results as Array<{ name: string; url: string }>);

  const allTypes = res
    .filter((t) => t.name !== "unknown" && t.name !== "shadow")
    .map((t) => ({ name: t.name, value: t.name }));

  return allTypes;
};

export const fetchPokeEvoChain = async (name: string) => {
  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`,
  )
    .then((res) => res.json())
    .then((data) => data.evolution_chain.url);

  const evoRes = await fetch(speciesRes).then((res) => res.json());

  const evoChain = [] as Array<{ name: string; id: number }>;

  type IEvolutionType = {
    species: { name: string; url: string };
    evolves_to: IEvolutionType[];
  };

  const evoNames = (obj: IEvolutionType) => {
    if (!obj) return evoChain;
    evoChain.push({
      name: obj.species.name,
      id: Number(obj.species.url.split("/")[6]),
    });

    if (obj.evolves_to && obj.evolves_to.length > 0) {
      return evoNames(obj.evolves_to[0]);
    }
    return evoChain;
  };
  evoNames(evoRes.chain);

  return evoChain;
};
