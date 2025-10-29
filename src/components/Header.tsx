"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie, setCookie } from "cookies-next";
import {
  LogIn,
  LogOut,
  Moon,
  Sun,
  User as UserIcon,
  UserPen,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
// import { useAuthStore } from "@/components/AuthProvider";

export default function Header() {
  const [theme, setTheme] = useState(() => getCookie("theme") || "light");
  const [open, setOpen] = useState(false);
  const supabase = createClient();
  const router = useRouter();
  const pathName = usePathname();
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "INITIAL_SESSION" || event === "SIGNED_IN") {
        if (session?.user) {
          setUser(session.user);
        }
      } else if (event === "SIGNED_OUT") {
        setUser(null);
      }
    });

    return () => subscription?.unsubscribe();
  }, [setUser]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  const handleSignOut = () => {
    supabase.auth.signOut();
    setOpen(false);
    setUser(null);

    if (pathName === "/account") {
      router.push("/login");
    }
    router.refresh();
  };

  return (
    <div className="relative z-20 flex items-center justify-between border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/80">
      <h1 className="text-accent text-2xl font-extrabold tracking-tight">
        Pokédex
      </h1>

      <div className="relative">
        <button
          onClick={toggleTheme}
          className={`border-border bg-bg h-5.5 w-10 rounded-full border transition-all duration-300 dark:bg-zinc-700`}
        >
          <span className="text-text flex h-4.5 w-4.5 items-center justify-center rounded-full bg-white p-0.5 transition-all duration-300 dark:translate-x-5 dark:bg-black dark:text-white">
            {theme === "light" ? <Sun /> : <Moon />}
          </span>
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="bg-accent ml-2 rounded-full p-1 text-white transition"
        >
          <UserIcon />
        </button>

        {open && (
          <div className="animate-fade-in absolute right-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              {user ? (
                <>
                  <li>
                    <Link
                      href="/account"
                      className="flex items-center gap-2 px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-zinc-700"
                      onClick={() => setOpen(false)}
                    >
                      <UserPen size={16} /> Account
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-2 px-4 py-2 text-left transition hover:bg-gray-100 dark:hover:bg-zinc-700"
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 px-4 py-2 transition hover:bg-gray-100 dark:hover:bg-zinc-700"
                    onClick={() => setOpen(false)}
                  >
                    <LogIn size={16} /> Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
