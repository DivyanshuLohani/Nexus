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
        <div className="flex justify-around">
            <div className="left max-h-[83vh] overflow-y-scroll bg-surface-low">
                <PageEditor
                    page={page}
                    onUpdate={triggerPreviewRefresh}
                />
                <AppearanceEditor
                    pageId={page.id}
                    initialBg={page.background ?? "#0a0a0a"}
                    initialText={page.textColor ?? "#ffffff"}
                    onUpdate={triggerPreviewRefresh}
                />
                <ProfileImageUploader
                    pageId={page.id}
                    currentImage={page.image}
                    onUpdate={triggerPreviewRefresh}
                />

                <LinksList
                    initialLinks={page.links}
                    pageId={page.id}
                    onUpdate={triggerPreviewRefresh}
                />
            </div>

            <div className="right w-full max-h-[60vh] h-[50vh]">
                <Preview
                    url={`/u/${username}?preview=true`}
                    refreshKey={previewKey}
                />
            </div>
        </div>
    );
}