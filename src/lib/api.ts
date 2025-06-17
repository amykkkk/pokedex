export const fetchAllPokemon = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`);
  const data = await res.json();
  return data.results;
};

export const fetchPokemonDetail = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return await res.json();
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
