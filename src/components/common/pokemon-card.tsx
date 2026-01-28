"use client";

import { toggleLikeAction } from "@/actions/toggle-like.action";
import { Heart, Loader } from "lucide-react";
import Link from "next/link";
import React, { useOptimistic, useTransition } from "react";

type ICardProps = {
  name: string;
  id: number;
  isLiked: boolean;
  isLoggedIn: boolean;
};

export default function PokemonCard({
  name,
  id,
  isLiked,
  isLoggedIn,
}: ICardProps) {
  const [pending, startTransition] = useTransition();
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    isLiked,
    (prev) => !prev,
  );

  const onClickLike = () => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다!");
      return;
    }

    startTransition(() => {
      setOptimisticLiked(!optimisticLiked);
      toggleLikeAction(id, name);
    });
  };

  const imgUrl =
    `https://img.pokemondb.net/sprites/home/normal/${name}.png` !== undefined
      ? `https://img.pokemondb.net/sprites/home/normal/${name}.png`
      : `https://upload.wikimedia.org/wikipedia/commons/5/53/Poké_Ball_icon.svg`;

  return (
    <div className="group bg-card relative overflow-hidden rounded-2xl p-4 shadow-md transition-shadow duration-300 hover:shadow-xl">
      <button
        onClick={onClickLike}
        disabled={pending}
        className="absolute top-4 right-4 z-10 cursor-pointer text-red-600"
      >
        {pending ? (
          <Loader size={12} className="animate-spin" />
        ) : (
          <Heart size={16} className={optimisticLiked ? "fill-red-500" : ""} />
        )}
      </button>
      <Link href={`/pokemon/${name}`}>
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
      </Link>
    </div>
  );
}
