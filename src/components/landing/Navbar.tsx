"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
              rounded-xl
      
              shadow-lg
              backdrop-blur-md bg-white/80
            `
              : `
              scale-100
              bg-white
            `
          }
        `}
      >
        <h1 className="font-semibold text-lg">Nexus</h1>

        <nav className="flex items-center gap-6 text-sm">
          <Link href="#" className="hidden md:block">
            Pricing
          </Link>
          <a
            href="https://github.com/DivyanshuLohani/Nexus"
            target="_blank"
            rel="noopener noreferrer"
            className="
            text-zinc-600
            hover:text-black
            transition
            flex items-center
        "
          >
            <FaGithub size={18} />
          </a>

          <Link
            href="/auth/signup"
            className="bg-black text-white px-4 py-2 text-sm rounded-md"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
