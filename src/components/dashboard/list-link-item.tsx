"use client";

import { useEffect, useState } from "react";
import { Trash2, GripVertical, Check } from "lucide-react";
import { deleteLinkAction } from "@/lib/actions/deleteLink";
import { updateLinkAction } from "@/lib/actions/updateLink";
import toast from "react-hot-toast";
import { type DbLink } from "@/lib/db/schema";

type Link = DbLink;

interface Props {
    link: Link;
    onDelete: (id: string) => void;
    onUpdate: (link: Link) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dragHandleProps?: any;
}

export default function ListLinkItem({
    link,
    onDelete,
    onUpdate,
    dragHandleProps,
}: Props) {
    const [label, setLabel] = useState(link.label);
    const [url, setUrl] = useState(link.url);

    const [saving, setSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [edit, setEdit] = useState(false);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    useEffect(() => {
        if (label !== link.label || url !== link.url) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEdit(true);
        } else {
            setEdit(false);
        }
    }, [label, link.label, link.url, url]);

    const handleSave = async () => {
        if (!label || !url || !edit) return;

        try {
            setSaving(true);
            const updated = await toast.promise(
                updateLinkAction(link.id, label, url),
                {
                    loading: "Saving...",
                    success: "Saved",
                    error: "Update failed",
                },
            );
            onUpdate(updated);
        } catch {
            toast.error("Update failed");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            await deleteLinkAction(link.id);
            onDelete(link.id);
        } catch {
            toast.error("Delete failed");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div
            className="
  bg-surface-high/40
  backdrop-blur-md
  border border-white/10
  rounded-xl
  p-4
  flex items-center gap-4
  transition
  hover:border-white/20
"
        >
            {/* drag */}
            <GripVertical
                size={18}
                className="text-outline cursor-grab"
                {...(mounted ? dragHandleProps : {})}
            />

            {/* inputs */}
            <div className="flex-1 space-y-1 text-on-surface">
                <input
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    onBlur={handleSave}
                    className="w-full bg-transparent border-b border-outline-variant text-sm outline-none"
                    placeholder="Title"
                />

                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onBlur={handleSave}
                    className="w-full bg-transparent border-b border-outline-variant text-xs outline-none text-text-secondary"
                    placeholder="https://..."
                />
            </div>

            {/* actions */}
            <div className="flex items-center gap-2">
                {/* Save */}
                <button
                    onClick={handleSave}
                    disabled={!edit || saving}
                    className={`
      p-2 rounded-md border border-outline-variant
      text-green-500
      transition
      ${edit ? "opacity-100" : "opacity-0 pointer-events-none"}
      hover:bg-surface-high
      text-on-surface
    `}
                >
                    <Check size={16} />
                </button>

                {/* Delete */}
                <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="
      p-2 rounded-md border border-outline-variant
      text-text-secondary
      transition
      hover:text-red-500 hover:bg-surface-high
      text-on-surface
    "
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}
