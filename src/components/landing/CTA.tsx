import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-24 px-6 flex justify-center">
      <div className="border-[3px] border-border p-12 text-center max-w-2xl w-full relative bg-card rounded-md">
        <span className="absolute -top-3 left-4 text-xs bg-background px-2 border border-border rounded">
          SECURE YOUR SPOT
        </span>

        <h2 className="text-4xl font-bold mb-6">BEGIN THE CURATION.</h2>

        <Link
          href={"/auth/signup"}
          className="bg-primary text-primary-foreground px-6 py-3 text-sm rounded-md inline-block"
        >
          GET STARTED FREE
        </Link>

        <p className="text-xs text-muted-foreground mt-4">
          ZERO FRICTION. PURE PRECISION.
        </p>
      </div>
    </section>
  );
}
