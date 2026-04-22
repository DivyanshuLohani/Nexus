import type { DbSocialLink, DbPage } from "@/lib/db/schema";
import IconRenderer from "./IconRenderer";

export default function SocialIconsSection({
  socials,
  page,
}: {
  socials: DbSocialLink[];
  page: DbPage;
}) {
  if (!socials.length) return null;

  return (
    <div className="mb-6 flex flex-wrap justify-center gap-3">
      {socials.map((social) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            w-10 h-10
            flex items-center justify-center

            rounded-xl

            backdrop-blur-md
            bg-white/5
            border border-white/10

            transition-all duration-300
            hover:scale-110
          "
          style={{
            color: page.textColor ?? "",
            borderColor: `${page.textColor}20`,
          }}
        >
          {/* subtle glow */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition"
            style={{ background: `${page.textColor}30` }}
          />

          {/* icon */}
          <div className="relative">
            <IconRenderer
              platform={social.platform}
              style={page.iconStyle ?? "colored"}
            />
          </div>
        </a>
      ))}
    </div>
  );
}
