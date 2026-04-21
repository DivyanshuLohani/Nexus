import Link from "next/link";

export default function BrandingBadge() {
    return (
        <div className="fixed bottom-6 right-0 left-0 opacity-60">
            <div className="flex justify-center">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-tighter uppercase"
                >

                    <div
                        className="w-5 h-5"
                        style={{
                            backgroundColor: "currentColor",
                            WebkitMask: "url(/icons/logo.svg) no-repeat center / contain",
                            mask: "url(/icons/logo.svg) no-repeat center / contain",
                        }}
                    />

                    LinkOne
                </Link>
            </div>
        </div>
    );
}