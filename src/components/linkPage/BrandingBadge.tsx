// BrandingBadge.tsx

import Link from "next/link";

export default function BrandingBadge() {
    return (
        <div className="fixed bottom-6 right-0 left-0 opacity-60">
            <div className="flex justify-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-tighter uppercase"
                >
                    <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center rounded-md">
                        L
                    </span>
                    LinkOne
                </Link>
            </div>
        </div>
    );
}