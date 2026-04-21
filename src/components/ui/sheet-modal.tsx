"use client";

import { useEffect } from "react";
import { X, Settings, Copy } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
  url: string;
}

export default function ShareModal({ open, onClose, url }: Props) {
  // close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!open) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    toast.success("Copied!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-2xl p-4 animate-slide-up">
        {/* header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-sm">Share</h2>

          <div className="flex items-center gap-3 text-zinc-500">
            {/* <Settings size={16} /> */}
            <button onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        {/* link box */}
        <div className="flex items-center justify-between bg-zinc-100 rounded-lg px-3 py-2 mb-4">
          <span className="text-xs truncate">{url}</span>

          <button
            onClick={handleCopy}
            className="bg-black text-white text-xs px-3 py-1 rounded-md"
          >
            Copy
          </button>
        </div>

        {/* platforms */}
        {/* <div className="mb-4">
          <p className="text-xs text-zinc-500 mb-2">My platforms</p>

          <div className="flex gap-4">
            <Platform icon="📸" label="Instagram" />
            <Platform icon="🎵" label="TikTok" />
            <Platform icon="▶️" label="YouTube" />
            <Platform icon="📘" label="Facebook" />
          </div>
        </div> */}

        {/* bottom shortcuts */}
        {/* <div className="flex justify-between border-t pt-3">
          <Shortcut icon="✨" label="My Linktree" />
          <Shortcut icon="🔳" label="QR Code" />
          <Shortcut icon="💳" label="Digital card" badge="NEW" />
          <Shortcut icon="🎵" label="TikTok" />
          <Shortcut icon="▶️" label="YouTube" />
        </div> */}
      </div>
    </div>
  );
}

function Platform({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex flex-col items-center text-xs">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 text-lg">
        {icon}
      </div>
      <span className="mt-1 text-[10px] text-zinc-500">{label}</span>
    </div>
  );
}

function Shortcut({
  icon,
  label,
  badge,
}: {
  icon: string;
  label: string;
  badge?: string;
}) {
  return (
    <div className="flex flex-col items-center text-xs relative">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 text-lg">
        {icon}
      </div>

      {badge && (
        <span className="absolute -top-1 right-0 text-[8px] bg-purple-500 text-white px-1 rounded">
          {badge}
        </span>
      )}

      <span className="mt-1 text-[10px] text-zinc-500">{label}</span>
    </div>
  );
}
