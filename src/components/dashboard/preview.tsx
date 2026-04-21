"use client";

import { useDebounce } from "@/hooks/useDebounce";

interface PreviewProps {
  url: string;
  refreshKey: number;
}

export default function Preview({ url, refreshKey }: PreviewProps) {
  const debouncedKey = useDebounce(refreshKey, 600);

  return (
    <div className="flex justify-center items-center">
      <div className="w-[320px] aspect-[9/16] rounded-4xl overflow-hidden shadow-xl border border-surface-low bg-inverse-surface">
        <iframe
          key={debouncedKey}
          src={url}
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}
