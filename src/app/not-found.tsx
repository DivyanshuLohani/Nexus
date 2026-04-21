import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-8">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tight">
            404
          </h1>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-2 leading-tight">
            PAGE NOT FOUND.
          </h2>

          <p className="text-zinc-500 mt-6 max-w-md text-lg">
            The page you&apos;re looking for doesn’t exist or has been moved.
            Let’s get you back on track.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 text-sm font-medium"
            >
              GO HOME
            </Link>

            <Link
              href="/dashboard"
              className="border border-black px-6 py-3 text-sm font-medium"
            >
              DASHBOARD
            </Link>
          </div>
        </div>

        {/* RIGHT (visual like landing preview) */}
        <div className="flex justify-center">
          <div className="w-[280px] h-[520px] border-[6px] border-black rounded-[40px] overflow-hidden shadow-xl bg-black flex items-center justify-center">
            {/* subtle empty state */}
            <div className="text-center text-white/70 px-4">
              <div className="text-sm mb-2">Nothing here</div>
              <div className="text-xs opacity-60">This link doesn’t exist</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
