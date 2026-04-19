// PageContainer.tsx

import { DbPage } from "@/lib/db/schema";

export default function PageContainer({
    page,
    children,
}: {
    page: DbPage;
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                background: page.background ?? "#0a0a0a",
                color: page.textColor ?? "#ffffff",
            }}
            className="relative min-h-screen flex py-10 justify-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            <div className="w-full max-w-sm px-4 text-center">
                {children}
            </div>
        </div>
    );
}