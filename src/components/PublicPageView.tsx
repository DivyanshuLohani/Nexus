/* eslint-disable @typescript-eslint/no-explicit-any */
interface Props {
    data: {
        user: any;
        page: any;
        links: any[];
    };
}

export default function PublicPageView({ data }: Props) {
    return (
        <div className="min-h-screen flex py-10 justify-center bg-surface text-on-surface">
            <div className="w-full max-w-sm px-4 text-center">

                {/* profile */}
                <div className="mb-8">
                    <div className="w-20 h-20 rounded-full bg-surface-high mx-auto mb-4 border border-outline-variant" />

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
        </div>
    );
}