"use client";

import { useState } from "react";
import IconRenderer from "@/components/linkPage/IconRenderer";
import { Plus, Trash2, Pencil } from "lucide-react";
import { SOCIAL_PLATFORMS, SocialPlatform } from "@/lib/platforms";
import type { DbSocialLink, IconStyle } from "@/lib/db/schema";
import toast from "react-hot-toast";
import {
  createSocialLink,
  deleteSocialLink,
  updateSocialLink,
} from "@/lib/actions/socialLinks";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function SocialLinksSection({
  links: initialLinks,
  pageId,
  iconStyle,
}: {
  links: DbSocialLink[];
  pageId: string;
  iconStyle: IconStyle;
}) {
  const [links, setLinks] = useState(initialLinks);
  const [open, setOpen] = useState(false);

  const [platform, setPlatform] = useState<SocialPlatform>("instagram");
  const [url, setUrl] = useState("");

  const [editing, setEditing] = useState<DbSocialLink | null>(null);

  // 🔥 ADD / EDIT
  const handleSubmit = async () => {
    if (!url) return;

    // 🚫 prevent duplicates (except editing same one)
    if (!editing && links.some((l) => l.platform === platform)) {
      toast.error("Platform already added");
      return;
    }

    try {
      if (editing) {
        const updated = await toast.promise(
          updateSocialLink(editing.id, platform, url),
          {
            loading: "Updating...",
            success: "Updated",
            error: "Failed",
          },
        );

        setLinks((prev) =>
          prev.map((l) => (l.id === editing.id ? updated : l)),
        );
      } else {
        const created = await toast.promise(
          createSocialLink(pageId, platform, url),
          {
            loading: "Adding...",
            success: "Added",
            error: "Failed",
          },
        );

        setLinks((prev) => [...prev, created]);
      }

      // reset
      setOpen(false);
      setUrl("");
      setEditing(null);
    } catch {
      toast.error("Something went wrong");
    }
  };

  // 🔥 DELETE
  const handleDelete = async (id: string) => {
    try {
      await toast.promise(deleteSocialLink(id), {
        loading: "Deleting...",
        success: "Deleted",
        error: "Failed",
      });

      setLinks((prev) => prev.filter((l) => l.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  // 🔥 EDIT INIT
  const startEdit = (link: DbSocialLink) => {
    setEditing(link);
    setPlatform(link.platform as SocialPlatform);
    setUrl(link.url);
    setOpen(true);
  };

  return (
    <div className="container p-2 space-y-4">
      <h3 className="text-sm font-semibold">SOCIAL LINKS</h3>

      {/* Existing socials */}
      <div className="flex flex-wrap gap-3">
        {links.map((link) => (
          <div
            key={link.id}
            className="
              flex items-center gap-2 px-3 py-2
              bg-surface-high rounded-lg border border-outline-variant
            "
          >
            {/* 🔥 icon wrapper for visibility */}
            <div className="p-1 rounded bg-white/10">
              <IconRenderer platform={link.platform} style={iconStyle} />
            </div>

            {/* edit */}
            <button
              onClick={() => startEdit(link)}
              className="opacity-60 hover:opacity-100"
            >
              <Pencil size={14} />
            </button>

            {/* delete */}
            <button
              onClick={() => handleDelete(link.id)}
              className="opacity-60 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add button */}
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);

          if (!o) {
            setEditing(null);
            setUrl("");
          }
        }}
      >
        <DialogTrigger asChild>
          <button className="w-full border border-dashed border-outline-variant rounded-xl p-4 text-sm flex items-center justify-center gap-2 hover:bg-surface-low transition">
            <Plus size={16} />
            Add social link
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Social Link" : "Add Social Link"}
            </DialogTitle>

            <DialogDescription>
              Select platform and add your profile URL
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Platform select */}
            <div className="grid grid-cols-4 gap-2">
              {SOCIAL_PLATFORMS.map((p) => {
                const disabled =
                  !editing && links.some((l) => l.platform === p);

                return (
                  <button
                    key={p}
                    type="button"
                    disabled={disabled}
                    onClick={() => setPlatform(p)}
                    className={`
                p-2 rounded-lg border flex items-center justify-center transition
                ${
                  platform === p
                    ? "border-primary bg-primary/10"
                    : "border-outline-variant"
                }
                ${
                  disabled
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-surface-low"
                }
              `}
                  >
                    <div className="p-1 rounded bg-white/10">
                      <IconRenderer platform={p} style={iconStyle} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* URL input */}
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-surface-high rounded-md text-sm outline-none border border-outline-variant focus:border-primary"
            />

            {/* Action */}
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-2 rounded-md hover:opacity-90 transition"
            >
              {editing ? "Update" : "Add"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
