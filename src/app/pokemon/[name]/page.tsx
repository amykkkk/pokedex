import PokemonCard from "@/components/PokemonCard";
import { fetchPokeEvoChain, fetchPokemonDetail } from "@/lib/api";

export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;
  const data = await fetchPokemonDetail(name);
  const evolutions = await fetchPokeEvoChain(name);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-3xl font-bold capitalize">{data.name}</h1>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`}
        alt={data.name}
        className="mb-4 h-64 w-64 object-contain"
      />

      <div className="mt-6 space-y-2 text-lg">
        <p>
          <strong>📏 키:</strong> {data.height}
        </p>
        <p>
          <strong>⚖️ 몸무게:</strong> {data.weight}
        </p>
        <p>
          <strong>🔥 타입:</strong>{" "}
          {data.types.map((t: any) => t.type.name).join(", ")}
        </p>

        <div>
          <strong>📊 능력치:</strong>
          <ul className="list-inside list-disc">
            {data.stats.map((s: any) => (
              <li key={s.stat.name}>
                {s.stat.name}: {s.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="mb-2 text-xl font-semibold">진화 정보</h2>
        <div className="flex items-center gap-4">
          {evolutions.map((evo) => (
            <PokemonCard key={evo} name={evo} />
          ))}
        </div>
      </div>
    </main>
  );
}
