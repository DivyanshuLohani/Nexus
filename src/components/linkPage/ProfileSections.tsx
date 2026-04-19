// ProfileSection.tsx

import { DbPage } from "@/lib/db/schema";
import Image from "next/image";

export default function ProfileSection({ page }: { page: DbPage }) {
    return (
        <div className="mb-8">
            {page.image && (
                <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden border border-outline-variant bg-surface-high">
                    <Image
                        width={300}
                        height={300}
                        src={page.image}
                        alt={page.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}

            <h1 className="text-xl font-semibold">{page.title}</h1>

            <p className="text-sm text-on-surface-variant mt-1">
                {page.subtitle}
            </p>
        </div>
    );
}