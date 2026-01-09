import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

type ICardProps = {
  name: string;
  id?: number;
  isLiked?: boolean;
};

export default function PokemonCard({ name, id, isLiked }: ICardProps) {
  const onClickLike = () => {
    // if(user){
    // } else {
    //   alert("로그인 후 이용 가능합니다!");
    // }
  };

  const imgUrl =
    `https://img.pokemondb.net/sprites/home/normal/${name}.png` !== undefined
      ? `https://img.pokemondb.net/sprites/home/normal/${name}.png`
      : `https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg`;

  return (
    <Link href={`/pokemon/${name}`}>
      <div className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-xl">
        <button
          onClick={onClickLike}
          className="absolute top-4 right-4 z-10 cursor-pointer text-red-600"
        >
          {isLiked ? (
            <Heart size={16} fill="var(--color-red-600)" strokeWidth={0} />
          ) : (
            <Heart size={16} />
          )}
        </button>
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
