"use client";

import { useState } from "react";

const types = [
  "fire",
  "water",
  "grass",
  "electric",
  "poison",
  "flying",
  "normal",
  "bug",
  "ground",
  "fairy",
  "fighting",
  "psychic",
];

export default function TypeFilter({
  onSelect,
}: {
  onSelect: (type: string) => void;
}) {
  const [selected, setSelected] = useState("");
  const handleClick = (type: string) => {
    setSelected(type);
    onSelect(type);
  };

  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {types.map((type) => (
        <button
          key={type}
          onClick={() => handleClick(type)}
          className={`rounded-full px-3 py-1 text-sm text-white ${selected === type ? "bg-red-500" : "bg-gray-500"} `}
        >
          {type.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
