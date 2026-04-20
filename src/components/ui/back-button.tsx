"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton({ backUrl }: { backUrl?: string }) {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                if (backUrl) {
                    router.replace(backUrl)
                    return;
                }
                router.back()
            }}
            className="flex items-center gap-1 text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors"
        >
            <ChevronLeft size={18} />
            <span>Back</span>
        </button>
    );
}