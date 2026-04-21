"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Home, BarChart3, Settings } from "lucide-react";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const params = useParams();

  const navItems = [
    { label: "Links", href: `/dashboard/${params.slug ?? ""}`, icon: Home },
    {
      label: "Analytics",
      href: `/dashboard/${params.slug ?? ""}/analytics`,
      icon: BarChart3,
    },
    {
      label: "Settings",
      href: `/dashboard/${params.slug ?? ""}/settings`,
      icon: Settings,
    },
  ];

  return (
    <aside className="hidden h-full border-outline-variant border md:flex w-64 bg-surface-low p-4 flex-col justify-between">
      <div>
        <Link href="/" className="mb-8 flex items-center gap-2">
          <Image
            width={32}
            height={32}
            src="/icons/logo.svg"
            alt="Nexus Logo"
            className="w-6 h-6 invert-0 dark:invert"
          />
          <h2 className="text-lg font-semibold">Nexus</h2>
        </Link>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isRoot = item.href === `/dashboard/${params.slug ?? ""}`;

            const active = isRoot
              ? pathname === item.href
              : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                  active
                    ? "bg-surface-high text-on-surface"
                    : "text-text-secondary hover:bg-surface-high/50"
                }`}
              >
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* <div className="space-y-4">
                <button className="w-full bg-black text-white py-2 rounded">
                    Upgrade to Pro
                </button>

                <div className="text-xs text-text-secondary space-y-2">
                    <div>Help</div>
                    <div>Logout</div>
                </div>
            </div> */}
    </aside>
  );
}
