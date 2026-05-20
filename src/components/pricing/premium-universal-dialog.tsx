"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Check,
  Crown,
  BarChart3,
  Globe,
  Headphones,
  ImageIcon,
  LayoutGrid,
  Link2,
  X,
} from "lucide-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

interface UpgradeDialogProps {
  open: boolean;
  onClose: () => void;
}

const features = [
  { icon: Link2, label: "Unlimited links" },
  { icon: ImageIcon, label: "Image uploads" },
  { icon: LayoutGrid, label: "Premium layouts" },
  { icon: BarChart3, label: "Analytics" },
  { icon: Globe, label: "Custom domains" },
  { icon: Headphones, label: "Priority support" },
];

export function UpgradeDialog({ open, onClose }: UpgradeDialogProps) {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTitle className="sr-only">Upgrade your plan</DialogTitle>
      <DialogContent className="overflow-hidden border-border/60 p-0 sm:max-w-4xl">
        <div className="grid md:grid-cols-2">
          {/* Left */}
          <div className="relative p-8">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium">
              <Crown className="h-4 w-4 text-yellow-500" />
              Upgrade to Pro
            </div>

            <h2 className="max-w-sm text-4xl font-bold leading-tight tracking-tight">
              Unlock more with{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 bg-clip-text text-transparent">
                Pro
              </span>{" "}
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Get access to premium features, advanced customization, analytics,
              and better branding tools.
            </p>

            <div className="mt-8 space-y-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div key={feature.label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <Check className="h-4 w-4 text-primary" />
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {feature.label}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 space-y-3">
              <Button
                onClick={() => router.push("/pricing")}
                size="lg"
                className="h-11 w-full hover:opacity-90"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade now
              </Button>

              <Button variant="ghost" onClick={onClose} className="w-full">
                Maybe later
              </Button>
            </div>
          </div>

          {/* Right */}
          <div className="relative hidden min-h-full items-center justify-center overflow-hidden bg-inverse-primary md:flex">
            <div className="absolute inset-0 bg-black/10" />

            {/* Floating Cards */}
            <div className="absolute left-16 top-16 rounded-2xl border bg-background/80 p-4 shadow-xl backdrop-blur">
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>

            <div className="absolute right-16 top-24 rounded-2xl border bg-background/80 p-4 shadow-xl backdrop-blur">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>

            <div className="absolute bottom-20 left-20 rounded-2xl border bg-background/80 p-4 shadow-xl backdrop-blur">
              <Globe className="h-8 w-8 text-primary" />
            </div>

            <div className="absolute bottom-16 right-20 rounded-2xl border bg-background/80 p-4 shadow-xl backdrop-blur">
              <LayoutGrid className="h-8 w-8 text-primary" />
            </div>

            {/* Center Crown */}
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-background/20 backdrop-blur-xl">
              <div className="absolute inset-0 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-background shadow-2xl">
                <Crown className="h-14 w-14 fill-yellow-500 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
