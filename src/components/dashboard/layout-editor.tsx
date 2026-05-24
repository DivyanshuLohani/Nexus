"use client";

import {
  LayoutGrid,
  Rows3,
  GalleryHorizontal,
  Minimize2,
  MonitorSmartphone,
  Check,
  Crown,
} from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";

import type { PageLayout } from "@/lib/db/schema";
import { updatePageLayoutAction } from "@/lib/actions/updatePage";

import ProRequired from "../ui/pricing/ProRequired";
import { cn } from "@/lib/utils";

interface LayoutEditorProps {
  value: PageLayout;
  pageId: string;
  unlockedLayouts: PageLayout[];
  onChange: (layout: PageLayout) => void;
}

const layouts = [
  {
    value: "STACK",
    title: "Stack",
    icon: Rows3,
    description: "Classic vertical links",
  },
  {
    value: "GRID",
    title: "Grid",
    icon: LayoutGrid,
    description: "Compact card layout",
  },
  {
    value: "CAROUSEL",
    title: "Carousel",
    icon: GalleryHorizontal,
    description: "Swipe horizontally",
  },
  {
    value: "MINIMAL",
    title: "Minimal",
    icon: Minimize2,
    description: "Simple and elegant",
  },
  // {
  //   value: "IMMERSIVE",
  //   title: "Immersive",
  //   icon: MonitorSmartphone,
  //   description: "Large visual sections",
  // },
] satisfies {
  value: PageLayout;
  title: string;
  icon: any;
  description: string;
  free?: boolean;
}[];

export default function LayoutEditor({
  value,
  pageId,
  unlockedLayouts = ["STACK"],
  onChange,
}: LayoutEditorProps) {
  const [selected, setSelected] = useState<PageLayout>(value);

  const handleChange = async (next: PageLayout) => {
    //    if (!unlocked) return;
    if (next === selected) return;
    const previous = selected;

    setSelected(next);

    toast.promise(updatePageLayoutAction(pageId, next), {
      loading: "Updating layout...",
      success: () => {
        onChange(next);
        return "Layout updated";
      },
      error: (err) => {
        setSelected(previous);
        return err?.toString() ?? "Failed to update layout";
      },
    });
  };

  return (
    <div
      className="container
    "
    >
      {/* TITLE */}
      <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
        PAGE LAYOUT
      </h3>

      {/* CARD */}
      <div className="p-3 rounded-lg border border-outline-variant bg-surface-high">
        {/* HEADER */}

        {/* OPTIONS */}
        <div className="grid grid-cols-2 gap-3">
          {layouts.map((layout) => {
            const Icon = layout.icon;

            const active = selected === layout.value;
            const unlocked = unlockedLayouts.includes(layout.value);
            return (
              <button
                key={layout.value}
                disabled={!unlocked}
                onClick={() => handleChange(layout.value)}
                className={cn(
                  `
    relative
    rounded-xl
    border
    p-3
    text-left
    transition
    hover:border-primary
    hover:bg-white/5
    `,
                  active &&
                    `
      border-primary
      bg-white/5
    `,
                  !active &&
                    `
      border-outline-variant
    `,
                  !unlocked &&
                    `
      opacity-60
      cursor-not-allowed
    `,
                )}
              >
                {/* SELECT */}

                {/* ICON */}
                <div className="flex items-center justify-between">
                  <div
                    className="
      w-10 h-10
      rounded-lg
      border
      border-outline-variant
      flex
      items-center
      justify-center
    "
                  >
                    <Icon size={18} />
                  </div>

                  {!unlocked && <ProRequired unlocked={false} />}
                </div>
                {/* TITLE */}
                <p className="text-sm font-medium">{layout.title}</p>

                {/* DESC */}
                <p className="text-xs opacity-60 mt-1">{layout.description}</p>

                {/* MINI PREVIEW */}
                <div className="mt-3">
                  {layout.value === "STACK" && (
                    <div className="space-y-1">
                      <div className="h-2 rounded bg-white/10" />
                      <div className="h-2 rounded bg-white/10" />
                      <div className="h-2 rounded bg-white/10" />
                    </div>
                  )}

                  {layout.value === "GRID" && (
                    <div className="grid grid-cols-2 gap-1">
                      {Array.from({
                        length: 4,
                      }).map((_, i) => (
                        <div key={i} className="h-4 rounded bg-white/10" />
                      ))}
                    </div>
                  )}

                  {layout.value === "CAROUSEL" && (
                    <div className="flex gap-1 overflow-hidden">
                      <div className="w-8 h-6 rounded bg-white/10" />
                      <div className="w-8 h-6 rounded bg-white/10" />
                      <div className="w-8 h-6 rounded bg-white/10" />
                    </div>
                  )}

                  {layout.value === "MINIMAL" && (
                    <div className="space-y-1">
                      <div className="h-[2px] bg-white/20" />
                      <div className="h-[2px] bg-white/20" />
                      <div className="h-[2px] bg-white/20" />
                    </div>
                  )}
                  {active && (
                    <div
                      className="
                      absolute
                      right-2
                      top-2
                    "
                    >
                      <Check size={14} />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        {selected === "MINIMAL" && (
          <div
            className="
      mt-3
      rounded-lg
      border
      border-yellow-500/20
      bg-yellow-500/10
      px-3
      py-2
      text-xs
      text-yellow-300
    "
          >
            Warning: Minimal layout does not display link thumbnails.
          </div>
        )}
      </div>
    </div>
  );
}
