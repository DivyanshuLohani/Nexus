import Link from "next/link";

export default function BrandingBadge({
  padding = "pt-6",
}: {
  padding?: string;
}) {
  return (
    <div className={` ${padding} opacity-60`}>
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
          Nexus
        </Link>
      </div>
    </div>
  );
}
