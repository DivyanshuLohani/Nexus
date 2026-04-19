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
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="w-full max-w-sm px-4 text-center">
                {/* profile */}
                <div className="mb-6">
                    <div className="w-20 h-20 rounded-full bg-gray-700 mx-auto mb-4" />

                    <h1 className="text-xl font-semibold">
                        {data.page.title}
                    </h1>

                    <p className="text-sm text-gray-400">
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
                            className="
                block w-full
                bg-white text-black
                py-3 rounded-lg
                font-medium
                hover:opacity-90 transition
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