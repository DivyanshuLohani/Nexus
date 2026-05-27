import { EyeIcon, MousePointerClickIcon } from "lucide-react";

export default function StatsCards({
  stats,
}: {
  stats: { totalViews: number; totalClicks: number };
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
        <p className="text-xs text-text-secondary flex justify-between items-center">
          <span>Total Views</span>
          <EyeIcon />
        </p>
        <h2 className="text-2xl font-semibold mt-2">{stats.totalViews}</h2>
      </div>

      <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
        <p className="text-xs text-text-secondary flex justify-between items-center">
          <span>Total Clicks</span>
          <MousePointerClickIcon />
        </p>

        <h2 className="text-2xl font-semibold mt-2">— {/* later */}</h2>
      </div>
    </div>
  );
}
