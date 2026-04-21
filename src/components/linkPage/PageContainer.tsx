// PageContainer.tsx

import { DbPage } from "@/lib/db/schema";

export default function PageContainer({
    page,
    children,
    preview = false,
}: {
    page: DbPage;
    children: React.ReactNode;
    preview?: boolean;
}) {
    return (
        <div
            style={{
                background: page.background ?? "#0a0a0a",
                color: page.textColor ?? "#ffffff",

            }}
            className={`
                relative flex justify-center overflow-hidden
                ${preview ? "h-screen py-6" : "min-h-screen py-10"}
                
            `}
        >
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            <div className="w-full max-w-sm px-4 text-center">
                {children}
            </div>
        </div>
    );
}