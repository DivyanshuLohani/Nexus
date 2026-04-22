"use client";

import { useState } from "react";
import PageEditor from "@/components/dashboard/PageEditor";
import LinksList from "@/components/dashboard/links-list";
import Preview from "@/components/dashboard/preview";
import { PageWithLinks } from "@/lib/db/schema";
import ProfileImageUploader from "./image-uploader";
import AppearanceEditor from "./appearance-editor";

interface Props {
  page: PageWithLinks;
  username: string;
}
export default function DashboardEditor({ page, username }: Props) {
  const [previewKey, setPreviewKey] = useState(0);

  const triggerPreviewRefresh = () => {
    setPreviewKey((k) => k + 1);
  };

  return (
    <div className="flex h-full">
      {/* LEFT PANEL (scrollable) */}
      <div className="w-full md:w-1/2 h-full overflow-y-auto bg-surface-low p-4 pb-10 space-y-6 ">
        <div className="flex">
          <ProfileImageUploader
            pageId={page.id}
            currentImage={page.image}
            onUpdate={triggerPreviewRefresh}
          />

          <PageEditor page={page} onUpdate={triggerPreviewRefresh} />
        </div>

        <LinksList
          initialLinks={page.links}
          pageId={page.id}
          onUpdate={triggerPreviewRefresh}
        />

        <AppearanceEditor
          pageId={page.id}
          initialBg={page.background ?? "#0a0a0a"}
          initialText={page.textColor ?? "#ffffff"}
          initialIconStyle={page.iconStyle ?? "colored"}
          initialIconsOff={page.iconsOff ?? false}
          onUpdate={triggerPreviewRefresh}
        />
      </div>

      {/* RIGHT PANEL (fixed) */}
      <div className="hidden md:flex w-1/2 h-full items-center justify-center bg-surface-mid">
        <Preview url={`/u/${username}?preview=true`} refreshKey={previewKey} />
      </div>
    </div>
  );
}
