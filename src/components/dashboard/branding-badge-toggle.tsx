"use client";

import { BadgeCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import toast from "react-hot-toast";
import { updatePageBrandingStatusAction } from "@/lib/actions/updatePage";
import BrandingBadge from "../linkPage/BrandingBadge";
import { useState } from "react";

interface BrandingBadgeProps {
  enabled: boolean;
  onChange: (value: boolean) => void;
  pageId: string;
}

export default function BrandingBadgeEditor({
  enabled,
  onChange,
  pageId,
}: BrandingBadgeProps) {
  const [badgeEnabled, setBadgeEnabled] = useState(enabled);
  const handleUpdate = (value: boolean) => {
    try {
      setBadgeEnabled(value);
      toast.promise(updatePageBrandingStatusAction(pageId, value), {
        loading: "Saving appearance...",
        success: "Appearance updated",
        error: "Failed to update appearance",
      });
      onChange(value);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="container">
      {/* TITLE */}
      <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide">
        BRANDING BADGE
      </h3>

      {/* CARD */}
      <div className="p-3 bg-surface-high rounded-lg border border-outline-variant">
        {/* TOP */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            {/* ICON */}
            <div
              className="
                w-10 h-10 rounded-lg
                flex items-center justify-center
                bg-white/5 border border-outline-variant
              "
            >
              <BadgeCheck size={18} />
            </div>

            {/* TEXT */}
            <div>
              <p className="text-sm font-medium">Show Branding Badge</p>

              <p className="text-xs opacity-60 mt-1">
                Display a small powered-by badge on your public page.
              </p>
            </div>
          </div>

          {/* SWITCH */}
          <Switch checked={badgeEnabled} onCheckedChange={handleUpdate} />
        </div>

        {/* PREVIEW */}
        <div
          className="
            mt-4
            rounded-lg
            border border-outline-variant
            bg-black/20
            px-3 py-2
          "
        >
          <div className="flex items-center justify-center gap-2 text-xs opacity-80">
            <BrandingBadge padding="pt-0" />
          </div>
        </div>
      </div>
    </div>
  );
}
