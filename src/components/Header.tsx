"use client";

import { useEffect, useState } from "react";

export default function Header() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className={theme}>
      <h1 className="text-banana mb-8 text-center text-4xl font-black">
        🔥 Pokédex
      </h1>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className="p-2"
      >
        {theme === "dark" ? "🌞 라이트모드" : "🌙 다크모드"}
      </button>
    </div>
  );
}
