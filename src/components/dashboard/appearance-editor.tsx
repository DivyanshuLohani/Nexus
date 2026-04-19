"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updatePageAppearanceAction } from "@/lib/actions/updatePage";

const presets = [
    "#0a0a0a",
    "#1e1e2f",
    "#e8ddb5",
    "linear-gradient(75deg, #667eea, #764ba2)",
    "linear-gradient(210deg, #ff758c, #ff7eb3)",
    "linear-gradient(135deg, #43e97b, #38f9d7)",
    "linear-gradient(250deg, #fa709a, #fee140)",
    "linear-gradient(95deg, #30cfd0, #330867)",
];

export default function AppearanceEditor({
    pageId,
    initialBg,
    initialText,
    onUpdate,
}: {
    pageId: string;
    initialBg: string;
    initialText: string;
    onUpdate: () => void;
}) {
    const [bg, setBg] = useState(initialBg);
    const [textColor, setTextColor] = useState(initialText);
    const [saving, setSaving] = useState(false);

    const apply = async (newBg: string, newText = textColor) => {
        setBg(newBg);

        try {
            setSaving(true);
            await updatePageAppearanceAction(pageId, newBg, newText);
            onUpdate();
        } catch {
            toast.error("Failed to update");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container">
            <h3 className="text-sm font-semibold mb-3">BACKGROUND</h3>

            {/* presets */}
            <div className="grid grid-cols-4 gap-3 mb-4">
                {presets.map((p) => (
                    <button
                        key={p}
                        onClick={() => apply(p)}
                        className={`
              w-14 h-14 rounded-lg 
              ${bg === p ? "" : ""}
            `}
                        style={{ background: p }}
                    />
                ))}
            </div>

            {/* custom */}
            <input
                value={bg}
                onChange={(e) => setBg(e.target.value)}
                onBlur={() => apply(bg)}
                className="w-full mb-4 px-3 py-2 bg-surface-high rounded-md text-sm"
                placeholder="#0a0a0a or gradient"
            />

            {/* text color */}
            <div className="flex gap-2">
                <button
                    onClick={() => apply(bg, "#ffffff")}
                    className={`w-10 h-10 rounded border ${textColor === "#ffffff" ? "ring-2 ring-primary" : ""}`}
                    style={{ background: "#fff" }}
                />
                <button
                    onClick={() => apply(bg, "#000000")}
                    className={`w-10 h-10 rounded border ${textColor === "#000000" ? "ring-2 ring-primary" : ""}`}
                    style={{ background: "#000" }}
                />
            </div>
        </div>
    );
}