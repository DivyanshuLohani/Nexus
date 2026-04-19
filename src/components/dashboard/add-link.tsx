"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { createLinkAction } from "../../lib/actions/createLink";

interface AddLinkProps {
    pageId: string;
}

export default function AddLink({ pageId }: AddLinkProps) {
    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleAdd = async () => {
        if (!title || !url) {
            toast.error("All fields required");
            return;
        }

        try {
            setLoading(true);

            await createLinkAction(pageId, title, url);

            toast.success("Link added");

            setTitle("");
            setUrl("");

            router.refresh(); // ✅ re-fetch server data
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface-highest p-6 rounded-xl mb-8">
            <h2 className="text-lg font-semibold mb-4">
                Add New Link
            </h2>

            <div className="space-y-4">
                <Input
                    label="TITLE"
                    placeholder="My Portfolio"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="flex gap-4 items-end">
                    <div className="flex-1">
                        <Input
                            label="URL"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>

                    <Button
                        className="h-10.5 px-5 min-w-27.5 shrink-0"
                        onClick={handleAdd}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add"}
                    </Button>
                </div>
            </div>
        </div>
    );
}