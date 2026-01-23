import { getPokemonList } from "@/lib/get-pokemon-list";
import Pagination from "../Pagination";
import PokemonCard from "./pokemon-card";
import { getUserLikes } from "@/lib/get-user-likes";

export default async function PokemonList({
  type,
  query,
  sort,
  page,
}: {
  type: string;
  query: string;
  sort: string;
  page: number;
}) {
  const LIMIT = 20;
  const { list, total } = await getPokemonList({
    type,
    query,
    sort,
    page,
    limit: LIMIT,
  });
  const { likesList, isLoggedIn } = await getUserLikes();

  return (
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((p) => (
          <PokemonCard
            key={p.name}
            {...p}
            isLiked={!!likesList[p.id]}
            isLoggedIn={isLoggedIn}
          />
        ))}
      </div>

      <div className="mt-10">
        <Pagination totalItems={total} pageItems={LIMIT} pageCount={5} />
      </div>
    </>
  );
}
