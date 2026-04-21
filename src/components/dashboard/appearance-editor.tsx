"use client";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { updatePageAppearanceAction } from "@/lib/actions/updatePage";
import { IconStyle } from "@/lib/db/schema";
import IconRenderer from "../linkPage/IconRenderer";
import { useDebounce } from "@/hooks/useDebounce";

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
  initialIconStyle,
  initialIconsOff,
  onUpdate,
}: {
  pageId: string;
  initialBg: string;
  initialText: string;
  initialIconStyle: IconStyle;
  initialIconsOff: boolean;
  onUpdate: () => void;
}) {
  const [bg, setBg] = useState(initialBg);
  const [textColor, setTextColor] = useState(initialText);
  const [iconStyle, setIconStyle] = useState(initialIconStyle);
  const [iconsOff, setIconsOff] = useState(initialIconsOff);
  const lastSaved = useRef<string>("");

  const debouncedState = useDebounce(
    {
      bg,
      textColor,
      iconStyle,
      iconsOff,
    },
    600,
  );

  const apply = (
    newBg: string,
    newText = textColor,
    newIconStyle = iconStyle,
    newIconsOff = iconsOff,
  ) => {
    setBg(newBg);
    setTextColor(newText);
    setIconStyle(newIconStyle);
    setIconsOff(newIconsOff);
  };

  useEffect(() => {
    const payload = JSON.stringify(debouncedState);

    // 🚫 prevent duplicate saves
    if (payload === lastSaved.current) return;

    lastSaved.current = payload;

    const save = async () => {
      try {
        await updatePageAppearanceAction(
          pageId,
          debouncedState.bg,
          debouncedState.textColor,
          debouncedState.iconStyle,
          debouncedState.iconsOff,
        );

        onUpdate();
      } catch {
        toast.error("Update failed");
      }
    };

    save();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedState, pageId]);

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

              ${bg === p ? "border-2 border-primary" : "border border-secondary"}
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

      <h3 className="text-sm font-semibold mt-6 mb-3">ICON STYLE</h3>
      {/* Toggle switch for icons enabled or not  */}
      <div className="flex items-center justify-between mb-4 p-3 bg-surface-high rounded-lg border border-outline-variant">
        <span className="text-xs font-medium">Show Icons</span>
        <button
          onClick={() => {
            // Note: updatePageAppearanceAction should be updated to handle iconsOff if needed
            apply(bg, textColor, iconStyle, !iconsOff);
          }}
          className={`
            relative inline-flex h-5 w-9 items-center rounded-full transition-colors
            ${!iconsOff ? "bg-primary" : "bg-zinc-600"}
          `}
        >
          <span
            className={`
              inline-block h-3 w-3 transform rounded-full bg-white transition-transform
              ${!iconsOff ? "translate-x-5" : "translate-x-1"}
            `}
          />
        </button>
      </div>

      {iconsOff ? null : (
        <div className="grid grid-cols-3 gap-3">
          {["colored", "filled", "mono"].map((s) => {
            return (
              <button
                key={s}
                onClick={() => apply(bg, textColor, s as IconStyle)}
                className={`
    p-3 rounded-lg border text-xs
    flex flex-col items-center gap-2
    ${iconStyle === s ? "border-primary" : "border-secondary"}
`}
              >
                <IconRenderer platform="instagram" style={s as IconStyle} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
