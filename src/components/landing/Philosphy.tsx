// Philosophy.tsx
export default function Philosophy() {
    return (
        <section className="relative bg-black text-white py-28 px-6 overflow-hidden">

            {/* subtle grain / texture */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.png')] pointer-events-none" />

            <div className="relative max-w-4xl mx-auto text-center">

                {/* label */}
                <p className="text-[10px] tracking-[0.3em] text-gray-400 mb-6">
                    MANIFESTO
                </p>

                {/* title */}
                <h2 className="text-5xl md:text-6xl font-semibold italic tracking-tight">
                    THE MONOLITH
                </h2>

                {/* divider */}
                <div className="w-12 h-[1px] bg-gray-600 mx-auto my-6" />

                {/* quote */}
                <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed italic">
                    &ldquo;Interface should <span className="text-white font-medium">recede </span>
                    to allow the content to become the <span className="text-white font-medium">art</span>.&ldquo;
                </p>

                {/* visual */}
                <div className="mt-14 relative">

                    {/* glow */}
                    <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-tr from-white/10 to-transparent" />

                    {/* image / placeholder */}
                    <div className="relative border border-white/10 bg-gradient-to-br from-zinc-900 to-black h-[280px] md:h-[340px] rounded-sm overflow-hidden">

                        {/* fake abstract layers */}
                        <div className="absolute w-40 h-40 bg-white/5 top-6 left-6 blur-xl" />
                        <div className="absolute w-64 h-32 bg-white/5 bottom-6 right-10 blur-xl" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    </div>
                </div>

            </div>
        </section>
    );
}