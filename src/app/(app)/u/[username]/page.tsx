import PublicPageView from "@/components/linkPage/PublicPageView";
import { addPageView } from "@/lib/services/analytics";
import { getPublicPage } from "@/lib/services/linkPage";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;

  const data = await getPublicPage(username);

  // 🔥 fallback (important)
  if (!data) {
    return {
      title: "Nexus",
      description: "Minimal link-in-bio for creators.",
    };
  }

  const name = data.user.name;
  const title = `@${name} | Nexus`;
  const description =
    data.page.subtitle ||
    `Explore ${name}'s links, content, and presence in one place.`;

  // 🔥 fallback image (important)
  const image = data.page.image || `${process.env.APP_URL}/og/default.png`;

  const url = `${process.env.APP_URL}/u/${name}`;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      url,
      siteName: "Nexus",
      type: "profile",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${name}'s Nexus page`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },

    // optional but nice
    metadataBase: new URL(process.env.APP_URL!),
  };
}
export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ preview: string }>;
}) {
  const { username } = await params;
  const { preview } = await searchParams;

  const data = await getPublicPage(username);

  // Add analytics if not preview
  if (!preview && data) {
    const headersList = await headers();
    addPageView(
      data.page.id,
      headersList.get("x-forwarded-for")?.split(",")[0] ?? "Unknown",
      headersList.get("user-agent") ?? "Unknown",
      headersList.get("referer") ?? "Unknown",
    );
  }

  if (!data) {
    notFound();
  }

  return <PublicPageView data={data} preview={preview === "true"} />;
}
