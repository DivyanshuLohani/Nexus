import type { DbLink, DbPage } from "@/lib/db/schema";
import { ExternalLink } from "lucide-react";
import { getPlatformIcon } from "@/lib/platforms";
import IconRenderer from "./IconRenderer";
import { hexToRgba } from "@/lib/color";
import Image from "next/image";

export default function LinksSection({
  links,
  page,
}: {
  links: DbLink[];
  page: DbPage;
}) {
  const borderColor = hexToRgba(page.textColor ?? "", 0.15);
  const hoverBg = hexToRgba(page.textColor ?? "", 0.08);
  const glow = hexToRgba(page.textColor ?? "", 0.25);

  return (
    <div className="space-y-4">
      {links.map((link) => {
        const platform = getPlatformIcon(link.url);
        const hasImage = !!link.image;

        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group relative block w-full
              rounded-2xl
              overflow-hidden

              bg-white/5
              backdrop-blur-xl

              shadow-[0_8px_32px_rgba(0,0,0,0.3)]

              text-left

              transition-all duration-300
              hover:scale-[1.02]
              hover:bg-white/10
            "
            style={{
              border: `1px solid ${borderColor}`,
            }}
          >
            {/* IMAGE */}
            {hasImage && (
              <div className="relative aspect-video w-full overflow-hidden border-b border-white/10">
                <Image
                  src={link.image!}
                  alt={link.label}
                  width={800}
                  height={800}
                  className="
                    h-full w-full object-cover
                    transition-transform duration-500
                    group-hover:scale-105
                  "
                />

                {/* image overlay */}
                <div className="absolute inset-0 bg-black/10" />
              </div>
            )}

            {/* highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-b from-white/20 to-transparent opacity-10 group-hover:opacity-20 transition" />

            {/* glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition blur-xl"
              style={{ background: glow }}
            />

            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
              style={{ background: hoverBg }}
            />

            {/* CONTENT */}
            <div className="relative flex items-center justify-between px-4 py-3">
              {/* LEFT */}
              <div
                className={`flex items-center gap-3 ${
                  page.iconsOff ? "justify-center w-full" : ""
                }`}
              >
                {/* ICON */}
                {!page.iconsOff &&
                  (platform ? (
                    <IconRenderer
                      platform={platform}
                      style={page.iconStyle ?? "colored"}
                    />
                  ) : (
                    <div className="w-5 h-5 flex items-center justify-center opacity-50">
                      <ExternalLink size={14} />
                    </div>
                  ))}

                {/* LABEL */}
                <span className="text-sm font-medium opacity-90">
                  {link.label}
                </span>
              </div>

              {/* RIGHT */}
              <ExternalLink
                size={12}
                className="opacity-60 group-hover:opacity-100 transition shrink-0"
              />
            </div>
          </a>
        );
      })}
    </div>
  );
}
