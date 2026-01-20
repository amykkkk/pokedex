import { getPokemonList } from "@/lib/get-pokemon-list";
import Pagination from "../Pagination";
import PokemonCard from "./pokemon-card";

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

  return (
    <>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {list.map((p) => (
          <PokemonCard key={p.name} {...p} isLiked={false} />
        ))}
      </div>

      <div className="mt-10">
        <Pagination totalItems={total} pageItems={LIMIT} pageCount={5} />
      </div>
    </>
  );
}
