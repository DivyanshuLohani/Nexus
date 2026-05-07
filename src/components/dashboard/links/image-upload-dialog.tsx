"use client";

import * as React from "react";
import { useCallback, useState, useRef } from "react";
import { Upload, X, ImageIcon, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { uploadImageAction } from "@/lib/actions/uploadImage";
// import { uploadImageAction } from "@/actions/upload-image-action";

interface ImageUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImageUploaded: (url: string) => void;
  currentImage?: string | null;
}

export function ImageUploadDialog({
  open,
  onOpenChange,
  onImageUploaded,
  currentImage,
}: ImageUploadDialogProps) {
  const [preview, setPreview] = useState<string | null>(currentImage ?? null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = useCallback(() => {
    setPreview(currentImage ?? null);
    setSelectedFile(null);
    setError(null);
    setIsDragging(false);
  }, [currentImage]);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (isUploading) return; // Prevent closing while uploading
      if (!newOpen) {
        resetState();
      }
      onOpenChange(newOpen);
    },
    [isUploading, onOpenChange, resetState],
  );

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Please select an image file";
    }
    if (file.size > 5 * 1024 * 1024) {
      return "File size must be less than 5MB";
    }
    return null;
  };

  const handleFileSelect = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFileSelect(files[0]);
      }
    },
    [handleFileSelect],
  );

  const handleRemoveImage = useCallback(() => {
    setPreview(null);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, []);

  const handleUpload = useCallback(async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const url = await uploadImageAction(formData);
      onImageUploaded(url);
      handleOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  }, [selectedFile, onImageUploaded, handleOpenChange]);

  const handleClickUploadArea = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={!isUploading}
        onPointerDownOutside={(e) => {
          if (isUploading) e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          if (isUploading) e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
          <DialogDescription>
            Drag and drop an image or click to select. Max size: 5MB.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {preview ? (
            <div className="relative">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              </div>
              {!isUploading && (
                <Button
                  variant="destructive"
                  size="icon-sm"
                  className="absolute -top-2 -right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="size-4" />
                  <span className="sr-only">Remove image</span>
                </Button>
              )}
            </div>
          ) : (
            <div
              role="button"
              tabIndex={0}
              onClick={handleClickUploadArea}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleClickUploadArea();
                }
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={cn(
                "flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
              )}
            >
              <div className="rounded-full bg-muted p-3">
                <ImageIcon className="size-6 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  {isDragging ? "Drop image here" : "Click or drag to upload"}
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="sr-only"
          />

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="size-4" />
                Upload
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
