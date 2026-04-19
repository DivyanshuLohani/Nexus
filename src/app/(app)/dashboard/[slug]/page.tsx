import DashboardEditor from "@/components/dashboard/dashboard-editor";
import ThemeToggle from "@/components/ThemeToggle";
import { auth } from "@/lib/auth";
import { getPageBySlug } from "@/lib/services/linkPage";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return null;

    const page = await getPageBySlug(session.user.id, slug);
    if (!page) return notFound();

    return (
        <main className="p-0">
            {/* top bar */}
            <div className="flex justify-between sticky top-0 items-center mb-8 bg-surface-low p-4 rounded-xl border border-outline-variant">
                <div className="flex items-center gap-4">
                    <button
                        // onClick={() => window.history.back()}
                        className="px-3 py-2 text-sm font-medium text-on-surface hover:bg-surface-high rounded-lg transition-colors"
                    >
                        ← Back
                    </button>
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-on-surface">
                            Editor
                        </h1>
                        <p className="text-xs text-on-surface-variant">
                            Customize your page and links
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <a
                        href={`/u/${session.user.name}`}
                        target="_blank"
                        className="px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-high rounded-lg transition-colors"
                    >
                        View Live
                    </a>
                    <ThemeToggle />
                </div>
                {/* 🔥 Theme toggle here */}

            </div>

            {/* 🔥 client wrapper */}
            <DashboardEditor
                page={page}
                username={session.user.name}
            />
        </main>
    );
}