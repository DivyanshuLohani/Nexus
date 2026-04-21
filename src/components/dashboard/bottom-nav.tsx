"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Home, BarChart3, Settings, Eye } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();
    const params = useParams();

    const slug = params?.slug ?? "";

    const navItems = [
        {
            label: "Links",
            href: `/dashboard/${slug}`,
            icon: Home,
        },
        {
            label: "Preview",
            href: `/dashboard/${slug}/preview`,
            icon: Eye,
        },
        {
            label: "Analytics",
            href: `/dashboard/${slug}/analytics`,
            icon: BarChart3,
        },
        {
            label: "Settings",
            href: `/dashboard/${slug}/settings`,
            icon: Settings,
        },
    ];
    // if active link is the preview we don't render the bottom bar
    if (pathname.endsWith("/preview")) {
        return null;
    }


    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-low border-t border-outline-variant z-50">
            <div className="flex justify-around py-2">
                {navItems.map((item) => {
                    const isRoot = item.href === `/dashboard/${slug}`;

                    const active = isRoot
                        ? pathname === item.href
                        : pathname.startsWith(item.href);

                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 text-xs transition-colors ${active
                                ? "text-on-surface"
                                : "text-text-secondary"
                                }`}
                        >
                            <Icon size={18} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}