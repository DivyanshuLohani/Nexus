export default function PricingGridSkeleton() {
  return (
    <section className="px-6 pb-20 animate-pulse">
      <div className="flex justify-center mb-14">
        <div className="h-8 w-40 rounded-full bg-muted" />
      </div>

      <div
        className="
          max-w-7xl mx-auto
          grid gap-6
          md:grid-cols-3
        "
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="
              rounded-md border border-border
              bg-card p-8 h-[520px]
            "
          >
            <div className="h-6 w-24 rounded bg-muted mb-6" />

            <div className="h-14 w-32 rounded bg-muted mb-6" />

            <div className="space-y-4 mb-10">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="h-4 rounded bg-muted" />
              ))}
            </div>

            <div className="h-12 rounded-xl bg-muted mt-auto" />
          </div>
        ))}
      </div>
    </section>
  );
}
