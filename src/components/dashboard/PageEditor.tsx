"use client";

import { useState, useEffect } from "react";
import { updatePageAction } from "@/lib/actions/updatePage";
import toast from "react-hot-toast";

interface Page {
  id: string;
  title: string;
  subtitle: string | null;
}

interface Props {
  page: Page;
  onUpdate?: (page: Page) => void;
}

export default function PageEditor({ page, onUpdate }: Props) {
  // const [title, setTitle] = useState(page.title);
  const [subtitle, setSubtitle] = useState(page.subtitle || "");

  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // detect changes
  useEffect(() => {
    if (subtitle !== (page.subtitle || "")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditing(true);
    } else {
      setEditing(false);
    }
  }, [subtitle, page]);

  const handleSave = async () => {
    if (!editing || saving) return;

    try {
      setSaving(true);

      const updated = await toast.promise(updatePageAction(page.id, subtitle), {
        loading: "Saving...",
        success: "Saved",
        error: "Update failed",
      });

      onUpdate?.(updated);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <div className="space-y-4">
        {/* TITLE */}
        <h2 className="text-xl font-bold text-on-surface">{page.title}</h2>

        {/* SUBTITLE */}
        <input
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave();
          }}
          className="
            w-full
            bg-transparent
            text-sm text-text-secondary
            border-b border-outline-variant
            outline-none
            pb-1
          "
          placeholder="Short bio / description"
        />
      </div>
    </div>
  );
}
