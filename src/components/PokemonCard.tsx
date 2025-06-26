import Link from "next/link";
import React from "react";

type ICardProps = {
  name: string;
  id?: number;
};

export default function PokemonCard({ name, id }: ICardProps) {
  const imgUrl =
    `https://img.pokemondb.net/sprites/home/normal/${name}.png` !== undefined
      ? `https://img.pokemondb.net/sprites/home/normal/${name}.png`
      : `https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg`;

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="rounded-xl bg-white p-4 text-center shadow-md transition-transform hover:scale-105">
        <span>{id}</span>
        <img src={imgUrl} alt={name} className="mx-auto h-24 w-24" />
        <h3 className="mt-2 font-bold text-black capitalize">{name}</h3>
      </div>
    </Link>
  );
}
