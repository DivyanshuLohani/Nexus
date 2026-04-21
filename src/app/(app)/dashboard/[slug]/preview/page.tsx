import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BackButton from "@/components/ui/back-button";
import { Share2 } from "lucide-react";
import PreviewTopBar from "@/components/dashboard/PreviewTopbar";

export default async function PreviewPage({}: { params: { slug: string } }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  // const page = await getPageBySlug(session.user.id, params.slug);
  // if (!page) return notFound();

  return (
    <main className="min-h-screen bg-surface  justify-center flex flex-col">
      {/* Header */}
      <PreviewTopBar
        username={session.user.name}
        appUrl={process.env.APP_URL!}
      />
      {/* Preview with iframe */}
      <div className=" flex justify-center py-10 px-1">
        <div className="w-full max-w-[360px] aspect-[9/19] bg-zinc-900 rounded-[3rem] border-[8px] border-zinc-800 overflow-hidden shadow-2xl">
          <iframe
            src={`/u/${session.user.name}?preview=true`}
            className="w-full h-full border-none"
          />
        </div>
      </div>
    </main>
  );
}
