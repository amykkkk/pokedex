import { fetchPokemonDetail } from "@/lib/api";

export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const data = await fetchPokemonDetail(params.name);

  return (
    <main className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-3xl font-bold capitalize">{data.name}</h1>
      <img
        src={data.sprites.front_default}
        alt={data.name}
        className="mx-auto h-32 w-32"
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
    </main>
  );
}
