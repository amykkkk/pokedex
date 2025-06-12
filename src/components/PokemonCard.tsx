import Link from "next/link";
import React from "react";

type ICardProps = {
  name: string;
  image: string;
};

export default function PokemonCard({ name, image }: ICardProps) {
  return (
    <Link href={`/pokemon/${name}`}>
      <div className="rounded-xl bg-white p-4 text-center shadow-md transition-transform hover:scale-105">
        <img src={image} alt={name} className="mx-auto h-24 w-24" />
        <h3 className="mt-2 font-bold text-black capitalize">{name}</h3>
      </div>
    </Link>
  );
}
