"use client";

import { useState, useEffect } from "react";
import ListLinkItem from "./list-link-item";
import { createLinkAction } from "@/lib/actions/createLink";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

interface Link {
    id: string;
    label: string;
    url: string;
}

interface LinksListProps {
    initialLinks: Link[];
    pageId: string;
}

export default function LinksList({
    initialLinks,
    pageId,
}: LinksListProps) {
    const [links, setLinks] = useState<Link[]>(initialLinks);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLinks(initialLinks);
    }, [initialLinks]);

    // ✅ create new link inline
    const handleAdd = async () => {
        const tempId = nanoid();

        const newLink = {
            id: tempId,
            label: "",
            url: "",
        };

        // optimistic add
        setLinks((prev) => [...prev, newLink]);

        try {
            setCreating(true);

            const created = await createLinkAction(
                pageId,
                "New Link",
                "https://example.com"
            );

            // replace temp with real
            setLinks((prev) =>
                prev.map((l) => (l.id === tempId ? created : l))
            );
        } catch {
            toast.error("Failed to create link");
            setLinks((prev) => prev.filter((l) => l.id !== tempId));
        } finally {
            setCreating(false);
        }
    };

    const handleDelete = (id: string) => {
        setLinks((prev) => prev.filter((l) => l.id !== id));
    };

    const handleUpdate = (updated: Link) => {
        setLinks((prev) =>
            prev.map((l) => (l.id === updated.id ? updated : l))
        );
    };

    return (
        <div className="container p-2">


            <div className="space-y-3">
                {links.map((link) => (
                    <ListLinkItem
                        key={link.id}
                        link={link}
                        onDelete={handleDelete}
                        onUpdate={handleUpdate}
                    />
                ))}

                {/* ➕ Add row */}
                <button
                    onClick={handleAdd}
                    disabled={creating}
                    className="w-full border border-dashed border-outline-variant rounded-xl p-4 text-sm text-text-secondary hover:bg-surface-low transition"
                >
                    + Add new link
                </button>
            </div>
        </div>
    );
}