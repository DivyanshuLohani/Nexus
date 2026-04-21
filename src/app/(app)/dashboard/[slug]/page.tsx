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
        <main className="h-screen flex flex-col overflow-hidden">

            {/* Header */}
            <div className="flex justify-between items-center bg-surface-low p-4 border border-outline-variant z-10">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <h1 className="text-xl font-bold text-on-surface">
                            Editor
                        </h1>
                        <p className="text-xs text-on-surface-variant">
                            Customize your page and links
                        </p>
                    </div>
                </div>

                <div className="md:flex gap-3 hidden">
                    <a
                        href={`/u/${session.user.name}`}
                        target="_blank"
                        className="px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-high rounded-lg"
                    >
                        View Live
                    </a>
                    <ThemeToggle />
                </div>
            </div>

            {/* Content fills remaining height */}
            <div className="flex-1 overflow-hidden">
                <DashboardEditor
                    page={page}
                    username={session.user.name}
                />
            </div>

        </main>
    );
}