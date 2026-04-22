"use client";

import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { updatePageImageAction } from "@/lib/actions/updatePage";

export default function ProfileImageUploader({
  pageId,
  currentImage,

  onUpdate,
}: {
  pageId: string;

  currentImage?: string | null;
  onUpdate: (url: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);

  const handleUpload = async (file: File) => {
    // ✅ instant preview
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const updated = await updatePageImageAction(pageId, formData);

      // replace preview with real url
      setPreview(updated.image ?? null);
      onUpdate(updated.image ?? "");

      toast.success("Image updated");
    } catch (e) {
      toast.error("Upload failed: " + (e as Error).message);

      // rollback preview if failed
      setPreview(currentImage ?? null);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center ">
      <div
        onClick={() => inputRef.current?.click()}
        className="relative  cursor-pointer group"
      >
        <div
          className="
          rounded-full
          overflow-hidden
          bg-surface-high
          border border-outline-variant
          w-full
        "
        >
          {preview ? (
            <img src={preview} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-32 flex items-center justify-center text-text-secondary text-xs">
              No Image
            </div>
          )}
        </div>

        {/* overlay */}
        <div
          className="

          absolute inset-0
          rounded-full
          bg-black/40
          opacity-0 group-hover:opacity-100
          flex items-center justify-center
          text-xs text-white
          transition
        "
        >
          {uploading ? "Uploading..." : "Change"}
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            handleUpload(e.target.files[0]);
          }
        }}
      />
    </div>
  );
}
