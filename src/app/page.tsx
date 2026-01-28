import PokemonList from "@/components/common/pokemon-list";
import CardLoading from "@/components/loading/CardLoading";
import SearchBox from "@/components/SearchBox";
import SelectBox from "@/components/SelectBox";
import { fetchPokemonAllTypes } from "@/lib/api";
import { SlidersHorizontal } from "lucide-react";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { type = "", page = "1", sort = "", query = "" } = await searchParams;
  const types = await fetchPokemonAllTypes();

  return (
    <main className="px-6 sm:px-12 md:px-24">
      <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <SearchBox placeholder="포켓몬 이름 검색" />
        <SelectBox options={types} query={"type"} title={"Type"} />

        <SelectBox
          options={[
            { name: "A - Z", value: "asc" },
            { name: " Z - A", value: "desc" },
            { name: "ID ⬇️ ", value: "id-asc" },
            { name: "ID ⬆️", value: "id-desc" },
          ]}
          query={"sort"}
          title={"Sort"}
          icon={<SlidersHorizontal />}
        />
      </div>

      <Suspense fallback={<CardLoading limit={20} />}>
        <PokemonList
          type={type}
          query={query}
          sort={sort}
          page={Number(page)}
        />
      </Suspense>
    </main>
  );
}
