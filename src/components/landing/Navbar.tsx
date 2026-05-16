"use client";

import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub, FaRegSun } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data, isPending } = authClient.useSession();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div
        className={`
          pointer-events-auto
          flex items-center justify-between

          w-full 
          px-8 py-6

          transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]

          ${
            scrolled
              ? `
              mt-4
              px-6 py-3
              scale-[0.96]
              rounded-md
      
              shadow-lg
              backdrop-blur-md bg-background/80
            `
              : `
              scale-100
              bg-background
            `
          }
        `}
      >
        <Link href="/">
          <h1 className="font-semibold text-lg">Nexus</h1>
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="/pricing" className="hidden md:block">
            Pricing
          </Link>
          <a
            href="https://github.com/DivyanshuLohani/Nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="
            text-muted-foreground
            hover:text-foreground
            transition
            flex items-center
        "
          >
            <FaGithub size={18} />
          </a>
          <button
            onClick={() => {
              theme === "light" ? setTheme("dark") : setTheme("light");
            }}
          >
            <FaRegSun size={18} />
          </button>
          {!isPending && data?.user ? (
            <Link
              href="/dashboard"
              className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-md"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/auth/signup"
              className="bg-primary text-primary-foreground px-4 py-2 text-sm rounded-md"
            >
              Get Started
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
