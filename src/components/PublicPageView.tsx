/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
    data: {
        user: any;
        page: any;
        links: any[];
    };
}
import Image from "next/image";
import Link from "next/link";

export default function PublicPageView({ data }: Props) {
    return (
        <div className="min-h-screen flex py-10 justify-center bg-surface text-on-surface">
            <div className="w-full max-w-sm px-4 text-center">

                {/* profile */}
                <div className="mb-8">
                    {/* Image */}
                    {data.page.image && (
                        <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden border border-outline-variant bg-surface-high rounded-full">
                            <Image
                                width={300}
                                height={300}
                                src={data.page.image}
                                alt={data.page.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}


                    <h1 className="text-xl font-semibold">
                        {data.page.title}
                    </h1>

                    <p className="text-sm text-on-surface-variant mt-1">
                        {data.page.subtitle}
                    </p>
                </div>

                {/* links */}
                <div className="space-y-3">
                    {data.links.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
            block w-full
            bg-primary text-on-primary
            py-3 rounded-lg
            font-medium
            border border-outline-variant
            transition-all
            hover:opacity-90 hover:scale-[1.01]
            active:scale-[0.98]
          "
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
            <div className="fixed bottom-6 right-6">
                <div className="bg-surface-high border border-outline-variant p-2 rounded-full shadow-lg">
                    <Link
                        href="/"
                        className="flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-tighter uppercase"
                    >
                        <span className="bg-primary text-on-primary w-5 h-5 flex items-center justify-center rounded-md">
                            L
                        </span>
                        LinkOne
                    </Link>
                </div>
            </div>

        </div>
    );
}