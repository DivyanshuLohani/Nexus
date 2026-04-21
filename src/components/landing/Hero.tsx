import type { DbLink, DbPage, DbUser } from "@/lib/db/schema";
import PublicPageView from "../linkPage/PublicPageView";
import Link from "next/link";

// Hero.tsx
export default function Hero() {
  return (
    <section className="px-10 py-20 grid md:grid-cols-2 gap-10 items-center border-b">
      <div>
        {/* <p className="text-xs tracking-widest mb-4">VERSION 2.0 NOW LIVE</p> */}

        <h1 className="text-6xl md:text-7xl font-black leading-[0.9] tracking-tight">
          YOUR DIGITAL
          <br />
          <span className="text-outline">IDENTITY,</span>
          <br />
          SIMPLIFIED.
        </h1>

        <p className="mt-6 text-gray-600 max-w-md">
          A monochromatic landscape for your professional presence.
        </p>

        <div className="flex gap-4 mt-8 justify-center md:justify-start">
          <Link
            href={"/auth/signup"}
            className="bg-black text-white px-6 py-3 text-sm"
          >
            GET STARTED
          </Link>

          <Link
            href={"/u/divyanshulohani"}
            className="border border-black px-6 py-3 text-sm"
          >
            LIVE DEMO
          </Link>
        </div>
      </div>

      {/* preview */}
      <div className="flex justify-center">
        <div className="w-[280px] h-[520px] border-[6px] border-black rounded-[40px] object-cover overflow-hidden">
          <PublicPageView
            data={{
              user: { name: "Nexus" } as DbUser,
              page: {
                title: "Nexus",
                subtitle: "The Monolith",
                background: "linear-gradient(to right, #000000, #152331)",
                textColor: "#ffffff",
                image: "/imgs/avatar.png",
              } as DbPage,
              links: [
                { id: "1", label: "Portfolio", url: "#" },
                { id: "2", label: "Twitter", url: "#" },
                { id: "3", label: "GitHub", url: "#" },
              ] as DbLink[],
            }}
            preview={true}
          />
        </div>
      </div>
    </section>
  );
}
