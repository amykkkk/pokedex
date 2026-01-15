import PokemonCard from "@/components/PokemonCard";
import StatsChart from "@/components/StatsChart";
import { fetchPokeEvoChain, fetchPokemonDetail } from "@/lib/api";

export default async function PokemonDetail({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;
  const data = await fetchPokemonDetail(name);
  const evolutions = await fetchPokeEvoChain(name);

  const imgUrl =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png` !==
    undefined
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
      : `https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg`;

  return (
    <main className="bg-gradient-to-br from-yellow-50 to-white p-6 md:p-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 rounded-3xl bg-white p-8 shadow-lg md:flex-row md:p-12">
        {/* 좌측: 이미지 + 기본정보 */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative h-48 w-48">
            <img
              src={imgUrl}
              alt={data.name}
              className="h-full w-full object-contain drop-shadow-lg"
            />
            <div className="absolute -top-4 -left-4 rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600 shadow">
              #{data.id.toString().padStart(3, "0")}
            </div>
          </div>

          <h2 className="mt-6 text-3xl font-black text-gray-800 capitalize">
            {data.name}
          </h2>

          <div className="mt-4 space-y-2 text-center text-sm text-gray-600">
            <p>
              <strong className="text-gray-800">📏 키:</strong> {data.height} m
            </p>
            <p>
              <strong className="text-gray-800">⚖️ 몸무게:</strong>{" "}
              {data.weight} kg
            </p>
          </div>

          <div className="mt-4">
            <strong className="mb-2 block text-sm text-gray-700">
              🔥 타입
            </strong>
            <div className="flex flex-wrap justify-center gap-2">
              {data.types.map((t: any) => (
                <span
                  key={t.type.name}
                  className="rounded-full bg-gradient-to-r from-blue-200 to-blue-400 px-4 py-1 text-xs font-semibold text-white shadow"
                >
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-10">
          <div className="rounded-2xl bg-gray-50 p-6 shadow-inner">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              📊 능력치 그래프
            </h3>
            <StatsChart stats={data.stats} />
          </div>

          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              🔁 진화 정보
            </h3>
            <div className="flex flex-wrap gap-4">
              {evolutions.map((evo) => (
                <PokemonCard key={evo} name={evo} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
