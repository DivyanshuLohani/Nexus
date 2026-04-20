export default function StatsCards({
    stats,
}: {
    stats: { totalViews: number };
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
                <p className="text-xs text-text-secondary">Total Views</p>
                <h2 className="text-2xl font-semibold mt-2">
                    {stats.totalViews}
                </h2>
            </div>

            <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
                <p className="text-xs text-text-secondary">Unique Visitors</p>
                <h2 className="text-2xl font-semibold mt-2">
                    — {/* later */}
                </h2>
            </div>

            <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
                <p className="text-xs text-text-secondary">Avg Session</p>
                <h2 className="text-2xl font-semibold mt-2">
                    — {/* later */}
                </h2>
            </div>
        </div>
    );
}