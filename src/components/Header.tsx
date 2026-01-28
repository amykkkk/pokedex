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
import Image from "next/image";
import { User } from "@supabase/supabase-js";

export default function Header({ user }: { user: User | null }) {
  const [theme, setTheme] = useState(() => getCookie("theme") || "light");
  const [open, setOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  const supabase = createClient();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!user) return;

    const checkLoginStatus = async () => {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        return console.log(error);
      }

      if (!data) return;

      setAvatarUrl(data.avatar_url);
    };
    checkLoginStatus();
  }, [user]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setOpen(false);

    if (pathName === "/account") {
      router.push("/auth/login");
    }
    router.refresh();
  };

  return (
    <div className="bg-bg fixed top-0 z-20 grid w-full grid-cols-[1fr_auto_auto] items-center justify-between px-6 py-3">
      <h1 className="text-2xl font-extrabold tracking-tight">
        <Link href="/">Pokédex</Link>
      </h1>

      <button
        onClick={toggleTheme}
        className={`bg-bg h-5.5 w-10 rounded-full border transition-all duration-300`}
      >
        <span
          className={`text-foreground bg-card border-border flex h-4.5 w-4.5 items-center justify-center rounded-full border p-0.5 transition-all duration-300 ${theme === "dark" && "translate-x-5"}`}
        >
          {theme === "light" ? <Sun /> : <Moon />}
        </span>
      </button>

      <button
        onClick={() => setOpen(!open)}
        className={`bg-primary text-primary-foreground relative ml-2 h-8 w-8 cursor-pointer overflow-hidden rounded-full transition`}
      >
        {user ? (
          <>
            {avatarUrl ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarUrl}`}
                alt="Profile Image"
                fill
                sizes="100%"
              />
            ) : (
              user.email && user.email.charAt(0).toUpperCase()
            )}
          </>
        ) : (
          <UserIcon size={18} className="inline-block h-11/12" />
        )}
      </button>

      {open && (
        <div className="animate-fade-in border-input bg-bg absolute top-11/12 right-6 w-auto rounded-lg border shadow-lg">
          <ul className="text-foreground min-w-28 px-1 py-2 text-xs">
            {user ? (
              <>
                <li>
                  <Link
                    href="/account"
                    className="hover:bg-card flex items-center gap-2 pl-1.5 leading-8 transition"
                    onClick={() => setOpen(false)}
                  >
                    <UserPen size={16} /> Account
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left transition hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/auth/login"
                  className="hover:bg-card flex items-center gap-2 rounded-xl pl-1.5 leading-8 transition"
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
  );
}
