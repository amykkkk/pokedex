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
      <div className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-50 to-blue-50 opacity-10 transition-opacity duration-300 group-hover:opacity-20" />

        <img
          src={imgUrl}
          alt={name}
          className="mx-auto h-24 w-24 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
        />
        <h3 className="mt-4 text-center text-lg font-bold text-gray-800 capitalize">
          {name}
        </h3>
        {id && (
          <p className="mt-1 text-center text-sm text-gray-400">
            #{id.toString().padStart(3, "0")}
          </p>
        )}
      </div>
    </Link>
  );
}
