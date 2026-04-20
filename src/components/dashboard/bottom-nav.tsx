"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Link2, BarChart2, Palette, Settings } from "lucide-react";

export default function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { label: "Links", href: "/dashboard", icon: Link2 },
        { label: "Analytics", href: "/dashboard/analytics", icon: BarChart2 },
        { label: "Appearance", href: "/dashboard/appearance", icon: Palette },
        { label: "Settings", href: "/dashboard/settings", icon: Settings },
    ];

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-low border-t border-outline-variant">
            <div className="flex justify-around py-2">
                {navItems.map((item) => {
                    const active = pathname.startsWith(item.href);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center text-xs ${active
                                ? "text-on-surface"
                                : "text-text-secondary"
                                }`}
                        >
                            <Icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}