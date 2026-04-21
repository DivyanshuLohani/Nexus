"use client";

import { Share2, SlidersHorizontal } from "lucide-react";
import BackButton from "@/components/ui/back-button";
import { useState } from "react";
import ShareModal from "../ui/sheet-modal";

interface Props {
  username: string;
  appUrl: string;
}

export default function PreviewTopBar({ username, appUrl }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-4 left-0 w-full flex justify-center z-50 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2">
        {/* URL pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-200/90 backdrop-blur-md shadow-md border border-zinc-300 min-w-[260px] max-w-[90vw]">
          <BackButton />

          <span className="text-xs text-zinc-700 truncate">
            {appUrl}/u/{username}
          </span>

          {/* Share */}
          {/* <button className="ml-auto text-zinc-600 hover:text-black">
            <Share2 size={16} />
          </button> */}
        </div>

        {/* Settings / controls button */}
        <button
          onClick={() => {
            // Use navigator to share

            if (navigator.share) {
              navigator
                .share({
                  title: "My Nexus Page",
                  url: `${appUrl}/u/${username}`,
                })
                .catch(() => {});
            } else {
            }
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-200/90 backdrop-blur-md shadow-md border border-zinc-300 text-zinc-600 hover:text-black"
        >
          <Share2 size={16} />
        </button>
      </div>
      <ShareModal
        open={open}
        onClose={() => setOpen(false)}
        url={`${appUrl}/u/${username}`}
      />
    </div>
  );
}
