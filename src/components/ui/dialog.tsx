"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import React from "react";

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function Dialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  children,
}: DialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      {trigger && (
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      )}

      <DialogPrimitive.Portal>
        {/* Overlay */}
        <DialogPrimitive.Overlay
          className="
            fixed inset-0 z-50
            bg-black/50 backdrop-blur-sm
            animate-in fade-in
          "
        />

        {/* Content */}
        <DialogPrimitive.Content
          className="
            fixed z-50
            left-1/2 top-1/2
            w-[90vw] max-w-md
            -translate-x-1/2 -translate-y-1/2

            rounded-xl
            border border-outline-variant
            bg-surface
            p-6
            shadow-xl

            animate-in zoom-in-95 fade-in
          "
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              {title && (
                <DialogPrimitive.Title className="text-lg font-semibold">
                  {title}
                </DialogPrimitive.Title>
              )}
              {description && (
                <DialogPrimitive.Description className="text-sm text-text-secondary">
                  {description}
                </DialogPrimitive.Description>
              )}
            </div>

            {/* Close button */}
            <DialogPrimitive.Close asChild>
              <button className="p-2 rounded-md hover:bg-surface-high transition">
                <X size={16} />
              </button>
            </DialogPrimitive.Close>
          </div>

          {/* Body */}
          <div>{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
