"use client";

import { useEffect, useState } from "react";
import { Trash2, GripVertical, Check, ImageIcon } from "lucide-react";
import { deleteLinkAction } from "@/lib/actions/deleteLink";
import { updateLinkAction } from "@/lib/actions/updateLink";
import toast from "react-hot-toast";
import { type DbLink } from "@/lib/db/schema";
import { ImageUploadDialog } from "./image-upload-dialog";
import { PlanRequiredError } from "@/lib/types/errors";
import { usePricingDialog } from "@/providers/PremiumDialogProvider";

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

  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [image, setImage] = useState<string | null>(link.image ?? null);
  const { open: openPricingDialog } = usePricingDialog();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (label !== link.label || url !== link.url || image !== link.image) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [label, link.label, link.url, url, image, link.image]);

  const handleSave = async () => {
    // if (!label || !url || !edit) return;

    try {
      setSaving(true);
      const updated = await toast.promise(
        updateLinkAction(link.id, label, url, image),
        {
          loading: "Saving...",
          success: "Saved",
          error: (e) => {
            // console.log(typeof e);
            if (e instanceof Error && e.name === "PlanRequiredError") {
              openPricingDialog();
              return;
            }

            return e.toString() ? e.toString() : "Update Failed";
          },
        },
      );
      onUpdate(updated);
    } catch {
      // We don't need to handle anything here as the error is already handled
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
        <div className="flex mt-2">
          <button
            onClick={() => setIsImageDialogOpen(true)}
            disabled={isDeleting}
            title={image ? "Image attached" : "Upload image"}
            className={`
      relative
      p-2 rounded-md border transition
      cursor-pointer
      hover:bg-surface-high
      text-on-surface

      ${
        image
          ? "border-green-500/40 bg-green-500/10 text-green-500"
          : "border-outline-variant text-text-secondary hover:text-on-surface-variant"
      }
    `}
          >
            <ImageIcon size={16} />

            {/* indicator dot */}
            {image && (
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-green-500 border border-background" />
            )}
          </button>
        </div>
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
      cursor-pointer
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
      <ImageUploadDialog
        open={isImageDialogOpen}
        onOpenChange={setIsImageDialogOpen}
        onImageUploaded={(url) => {
          setImage(url);
          handleSave();
        }}
        currentImage={image}
      />
    </div>
  );
}
