import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-24 px-6 flex justify-center">

            <div className="border-[3px] border-black p-12 text-center max-w-2xl w-full relative">

                <span className="absolute -top-3 left-4 text-xs bg-white px-2">
                    SECURE YOUR SPOT
                </span>

                <h2 className="text-4xl font-bold mb-6">
                    BEGIN THE CURATION.
                </h2>

                <Link href={"/auth/signup"} className="bg-black text-white px-6 py-3 text-sm">
                    GET STARTED FREE
                </Link>

                <p className="text-xs text-gray-500 mt-4">
                    ZERO FRICTION. PURE PRECISION.
                </p>
            </div>

        </section>
    );
}