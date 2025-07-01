"use client";

import { setCookie } from "@/utils/cookie";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header({ isTheme }: { isTheme: string }) {
  const [theme, setTheme] = useState(isTheme);

  useEffect(() => {
    setCookie("theme", theme);

    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <h1 className="text-banana mb-8 text-center text-xl">🔥 Pokédex</h1>
      <button
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        className={`border-border bg-bg relative h-5.5 w-10 rounded-full border transition-all duration-300 dark:bg-zinc-700`}
      >
        <span className="text-text flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white p-0.5 transition-all duration-300 dark:translate-x-5 dark:bg-black dark:text-white">
          {theme === "light" ? <Sun /> : <Moon />}
        </span>
      </button>
    </div>
  );
}
