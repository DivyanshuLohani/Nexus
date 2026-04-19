"use client";

import { useState } from "react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function CreatePage() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");

    const handleCreate = () => {
    };

    return (
        <div className="bg-surface-highest p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">
                Create your first page
            </h2>

            <div className="space-y-4">
                <Input
                    label="PAGE NAME"
                    placeholder="My Links"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                    label="SUBTITLE"
                    placeholder="Short bio"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                />

                <Button onClick={handleCreate}>
                    Create Page →
                </Button>
            </div>
        </div>
    );
}