import { ExternalLink } from "lucide-react";
import { getPlatformIcon } from "@/lib/platforms";
import IconRenderer from "./IconRenderer";
import { hexToRgba } from "@/lib/color";
import Image from "next/image";
import { DbLink, DbPage } from "@/lib/db/schema";

export default function LinkCard({
  link,
  page,
}: {
  link: DbLink;
  page: DbPage;
}) {
  const borderColor = hexToRgba(page.textColor ?? "", 0.15);
  const hoverBg = hexToRgba(page.textColor ?? "", 0.08);
  const glow = hexToRgba(page.textColor ?? "", 0.25);

  const platform = getPlatformIcon(link.url);
  const hasImage = !!link.image;

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        group relative block w-full
        rounded-2xl overflow-hidden

        bg-white/5
        backdrop-blur-xl

        shadow-[0_8px_32px_rgba(0,0,0,0.3)]

        transition-all duration-300
        hover:scale-[1.02]
      "
      style={{
        border: `1px solid ${borderColor}`,
      }}
    >
      {hasImage && (
        <div className="relative aspect-video border-b border-white/10">
          <Image
            src={link.image ?? ""}
            alt={link.label}
            width={800}
            height={400}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          <div className="absolute inset-0 bg-black/10" />
        </div>
      )}

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition"
        style={{ background: hoverBg }}
      />

      <div
        className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-100 transition"
        style={{ background: glow }}
      />

      <div className="relative flex items-center justify-between p-4">
        <div
          className={`flex items-center gap-3 ${
            page.iconsOff ? "w-full justify-center" : ""
          }`}
        >
          {!page.iconsOff &&
            (platform ? (
              <IconRenderer
                platform={platform}
                style={page.iconStyle ?? "colored"}
              />
            ) : (
              <ExternalLink size={16} />
            ))}

          <span>{link.label}</span>
        </div>

        <ExternalLink size={12} />
      </div>
    </a>
  );
}
