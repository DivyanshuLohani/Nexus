// LinksSection.tsx

import type { DbLink } from "@/lib/db/schema";
import { ExternalLink } from "lucide-react";

export default function LinksSection({ links }: { links: DbLink[] }) {
    return (
        <div className="space-y-4">
            {links.map((link) => (
                <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
            group relative block w-full
            rounded-xl
            border border-white/10
                
            px-4 py-3
            text-left
            backdrop-blur-md
            transition-all duration-200
            hover:scale-[1.01]
            hover:border-blue-500/50
          "
                >
                    {/* glow */}
                    <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-blue-500/10 blur-xl" />

                    {/* content */}
                    <div className="relative flex items-center justify-between">
                        {/* left */}
                        <div className="flex items-center gap-3">
                            {/* <div className="text-blue-400">
                                🔥
                            </div> */}

                            <span className="text-sm font-medium ">
                                {link.label}
                            </span>
                        </div>

                        {/* right */}
                        <ExternalLink
                            size={12}
                            className=" transition"
                        />
                    </div>
                </a>
            ))}
        </div>
    );
}