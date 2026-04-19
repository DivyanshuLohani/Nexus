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
    const [title, setTitle] = useState(page.title);
    const [subtitle, setSubtitle] = useState(page.subtitle || "");

    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // detect changes
    useEffect(() => {
        if (title !== page.title || subtitle !== (page.subtitle || "")) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEditing(true);
        } else {
            setEditing(false);
        }
    }, [title, subtitle, page]);

    const handleSave = async () => {
        if (!editing || saving) return;

        try {
            setSaving(true);

            const updated = await toast.promise(
                updatePageAction(page.id, title, subtitle),
                {
                    loading: "Saving...",
                    success: "Saved",
                    error: "Update failed",
                }
            );

            onUpdate?.(updated);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container">
            <div className="space-y-4">
                {/* TITLE */}
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSave();
                    }}
                    className="
            w-full
            bg-transparent
            text-xl font-semibold
            border-b border-outline-variant
            outline-none
            pb-1
          "
                    placeholder="Page Title"
                />

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