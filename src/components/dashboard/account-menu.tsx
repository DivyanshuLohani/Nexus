"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import {
  CircleHelp,
  Lightbulb,
  LogOut,
  User,
  Zap,
  ChevronDown,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export function AccountDropdown() {
  const { data, isPending, error } = authClient.useSession();
  const router = useRouter();
  const params = useParams();
  const settingsUrl = params.slug
    ? `/dashboard/${params.slug}/settings/account`
    : "/dashboard";

  if (isPending || error || !data?.session) {
    // Return a skeleton of the dropdown trigger
    return (
      <div className="h-10 w-full animate-pulse rounded-full bg-surface-high" />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between gap-2 px-2"
        >
          <span className="text-sm font-medium">{data.user.name}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-70 p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <User className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="space-y-0.5">
              <p className="text-sm font-semibold leading-none">
                {data.user.name}
              </p>
            </div>
          </div>

          <div className="rounded-full border px-3 py-1 text-xs font-medium">
            Pro
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <div className="py-1">
          <DropdownMenuItem asChild className="gap-3 px-4 py-3 cursor-pointer">
            <Link href={settingsUrl} className="flex w-full items-center gap-3">
              <User className="h-4 w-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>

          <Link href="/pricing">
            <DropdownMenuItem className="gap-3 px-4 py-3 cursor-pointer">
              <Zap className="h-4 w-4" />
              <span>Upgrade</span>
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem className="gap-3 px-4 py-3 cursor-pointer">
            <Link href="/support" className="flex w-full items-center gap-3">
              <CircleHelp className="h-4 w-4" />
              <span>Support</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="gap-3 px-4 py-3 cursor-pointer">
            <Link href="/feedback" className="flex w-full items-center gap-3">
              <Lightbulb className="h-4 w-4" />
              <span>Share feedback</span>
            </Link>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="gap-3 px-4 py-4 cursor-pointer hover:text-destructive transition-colors duration-150"
          onClick={() => {
            authClient.signOut();
            router.replace("/auth/login");
          }}
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
