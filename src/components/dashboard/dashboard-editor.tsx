"use client";

import { useState } from "react";
import PageEditor from "@/components/dashboard/PageEditor";
import LinksList from "@/components/dashboard/links-list";
import Preview from "@/components/dashboard/preview";
import { PageWithLinks } from "@/lib/db/schema";
import ProfileImageUploader from "./image-uploader";


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
            <div className="left max-h-[83vh] overflow-y-scroll">
                <PageEditor
                    page={page}
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
                    url={`/u/${username}`}
                    refreshKey={previewKey}
                />
            </div>
        </div>
    );
}