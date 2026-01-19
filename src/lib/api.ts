export type IPokemon = {
  name: string;
  id: number;
  url?: string;
};

export const fetchAllPokemon = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=1302`);
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

  return data.pokemon.map((p: any) => p.pokemon);
};

export const fetchPokemonAllTypes = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/type");
  const data = await res.json();
  return data.results;
};

export const fetchPokeEvoChain = async (name: string) => {
  const speciesRes = await fetch(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`,
  )
    .then((res) => res.json())
    .then((data) => data.evolution_chain.url);

  const evoRes = await fetch(speciesRes).then((res) => res.json());

  let evoChain: string[] = [];

  const evoNames = (obj: any) => {
    if (!obj) return evoChain;
    evoChain.push(obj.species.name);

    if (obj.evolves_to && obj.evolves_to.length > 0) {
      return evoNames(obj.evolves_to[0]);
    }
    return evoChain;
  };
  evoNames(evoRes.chain);

  return evoChain;
};
