export default function CheckoutPageSkeleton() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-xl mx-auto px-6 py-10 animate-pulse">
        {/* back button */}
        <div className="w-24 h-5 rounded-md bg-muted mb-10" />

        {/* title */}
        <div className="mb-8">
          <div className="w-48 h-10 rounded-lg bg-muted mb-3" />

          <div className="w-64 h-5 rounded-md bg-muted" />
        </div>

        {/* billing options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="
                rounded-2xl
                border border-border
                bg-card
                p-5
              "
            >
              {/* radio */}
              <div className="w-5 h-5 rounded-full bg-muted mb-5" />

              {/* badge */}
              {i === 2 && (
                <div className="w-16 h-5 rounded-full bg-muted mb-4 ml-auto" />
              )}

              {/* title */}
              <div className="w-24 h-6 rounded-md bg-muted mb-2" />

              {/* subtitle */}
              <div className="w-32 h-4 rounded-md bg-muted" />
            </div>
          ))}
        </div>

        {/* order summary */}
        <div className="rounded-2xl border border-border bg-card p-6">
          {/* heading */}
          <div className="w-40 h-7 rounded-md bg-muted mb-8" />

          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="space-y-2">
                  <div className="w-28 h-4 rounded bg-muted" />
                  <div className="w-20 h-3 rounded bg-muted" />
                </div>

                <div className="w-16 h-4 rounded bg-muted" />
              </div>
            ))}

            {/* total */}
            <div className="border-t border-border pt-5 flex justify-between">
              <div className="w-32 h-5 rounded bg-muted" />

              <div className="w-20 h-5 rounded bg-muted" />
            </div>
          </div>
        </div>

        {/* button */}
        <div className="w-full h-14 rounded-2xl bg-muted mt-6" />
      </div>
    </main>
  );
}
