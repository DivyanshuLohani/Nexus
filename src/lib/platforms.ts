export function getPlatformIcon(url: string) {
  if (!url) return null;

  const u = url.toLowerCase();

  if (u.includes("instagram")) return "instagram";
  if (u.includes("youtube")) return "youtube";
  if (u.includes("youtu.be")) return "youtube";
  if (u.includes("twitter.com")) return "twitter";
  if (u.includes("x.com")) return "twitter-x";
  if (u.includes("github")) return "github";
  if (u.includes("linkedin")) return "linkedin";
  if (u.includes("facebook")) return "facebook";
  if (u.includes("tiktok")) return "tiktok";
  if (u.includes("discord")) return "discord";
  if (u.includes("spotify")) return "spotify";
  if (u.includes("reddit")) return "reddit";
  if (u.includes("telegram")) return "telegram";
  if (u.includes("whatsapp")) return "whatsapp";
  if (u.includes("pinterest")) return "pinterest";
  if (u.includes("dribbble")) return "dribbble";
  if (u.includes("medium")) return "medium";
  if (u.includes("gitlab")) return "gitlab";
  if (u.includes("quora")) return "quora";

  return null;
}

export const SOCIAL_PLATFORMS = [
  "instagram",
  "youtube",
  "twitter",
  "twitter-x",
  "github",
  "linkedin",
  "facebook",
  "tiktok",
  "discord",
  "spotify",
  "reddit",
  "telegram",
  "whatsapp",
  "pinterest",
  "dribbble",
  "medium",
  "gitlab",
  "quora",
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];
