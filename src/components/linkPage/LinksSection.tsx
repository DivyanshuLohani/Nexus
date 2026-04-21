import type { DbLink, DbPage } from "@/lib/db/schema";
import { ExternalLink } from "lucide-react";
import { getPlatformIcon } from "@/lib/getPlatform";
import IconRenderer from "./IconRenderer";

export default function LinksSection({
  links,
  page,
}: {
  links: DbLink[];
  page: DbPage;
}) {
  return (
    <div className="space-y-4">
      {links.map((link) => {
        const platform = getPlatformIcon(link.url);

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative block w-full
              rounded-xl

              bg-white/5
              backdrop-blur-xl

              border border-white/10
              shadow-[0_8px_32px_rgba(0,0,0,0.3)]

              px-4 py-3
              text-left

              transition-all duration-300
              hover:scale-[1.02]
              hover:bg-white/10
              hover:border-white/20
            "
          >
            {/* highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-b from-white/20 to-transparent opacity-10 group-hover:opacity-20 transition" />

            {/* glow */}
            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-blue-500/10 blur-xl" />

            {/* content */}
            <div className="relative flex items-center justify-between">
              {/* LEFT */}
              <div
                className={`flex items-center gap-3 ${!page.iconsOff ? "justify-self-center" : ""}`}
              >
                {/* ICON */}

                {!page.iconsOff ? (
                  platform ? (
                    <IconRenderer
                      platform={platform}
                      style={page.iconStyle ?? "colored"}
                    />
                  ) : (
                    <div className="w-5 h-5 flex items-center justify-center text-white/50">
                      <ExternalLink size={14} />
                    </div>
                  )
                ) : null}

                {/* LABEL */}
                <span className="text-sm font-medium text-white/90">
                  {link.label}
                </span>
              </div>

              {/* RIGHT */}
              <ExternalLink
                size={12}
                className="text-white/60 group-hover:text-white transition"
              />
            </div>
          </a>
        );
      })}
    </div>
  );
}
