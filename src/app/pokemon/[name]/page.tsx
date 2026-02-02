import PokemonCard from "@/components/common/pokemon-card";
import StatsChart from "@/components/StatsChart";
import {
  fetchPokeEvoChain,
  fetchPokemonDetail,
  IPokemonDetail,
} from "@/lib/api";
import { getUserLikes } from "@/lib/get-user-likes";

export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const data: IPokemonDetail = await fetchPokemonDetail(name);
  const evolutions = await fetchPokeEvoChain(name);
  const { likesList, isLoggedIn } = await getUserLikes();

  const imgUrl =
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png` !==
    undefined
      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`
      : `https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg`;

  return (
    <main className="px-6 sm:px-12 md:px-24">
      <div className="border-border mx-auto mb-6 flex max-w-4xl flex-col gap-10 rounded-3xl p-8 shadow-lg ring-1 md:flex-row">
        {/* 좌측: 이미지 + 기본정보 */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600 shadow">
            #{data.id.toString().padStart(3, "0")}
          </div>
          <div className="h-48 w-48">
            <img
              src={imgUrl}
              alt={data.name}
              className="h-full w-full object-contain"
            />
          </div>

          <h2 className="text-foreground mt-6 text-3xl font-black capitalize">
            {data.name}
          </h2>

          <div className="text-text mt-4 space-y-2 text-center text-sm">
            <p>
              <strong className="text-primary">📏 키:</strong> {data.height}m
            </p>
            <p>
              <strong className="text-primary">⚖️ 몸무게:</strong> {data.weight}
              kg
            </p>
          </div>

          <div className="mt-4">
            <strong className="text-primary mb-2 block text-sm">🔥 타입</strong>
            <div className="flex flex-wrap justify-center gap-2">
              {data.types.map((t) => (
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
          <div className="bg-card rounded-xl p-4">
            <h3 className="text-foreground mb-4 text-xl font-bold">
              📊 능력치 그래프
            </h3>
            <StatsChart stats={data.stats} />
          </div>

          <div>
            <h3 className="text-foreground mb-4 text-xl font-bold">
              🔁 진화 정보
            </h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {evolutions.map((evo) => (
                <PokemonCard
                  key={evo.name}
                  name={evo.name}
                  id={evo.id}
                  isLiked={!!likesList[evo.id]}
                  isLoggedIn={isLoggedIn}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
