"use client";

import { DbPageView } from "@/lib/db/schema";

function formatTime(date: Date | string) {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RecentViews({ views }: { views: DbPageView[] }) {
  return (
    <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
      <h2 className="text-sm font-medium mb-4">Recent Page Views</h2>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-text-secondary text-xs">
            <tr>
              <th className="text-left py-2">Time</th>
              <th className="text-left py-2">IP</th>
              <th className="text-left py-2">Referrer</th>
              <th className="text-left py-2">Device</th>
            </tr>
          </thead>

          <tbody>
            {views.map((v) => (
              <tr key={v.id} className="border-t border-outline-variant">
                <td className="py-2">{formatTime(v.createdAt)}</td>
                <td>{v.ipAddress ?? "-"}</td>
                <td>{v.referer ?? "Direct"}</td>
                <td className="truncate max-w-[150px]">{v.userAgent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Cards */}
      <div className="space-y-3 md:hidden">
        {views.map((v) => (
          <div
            key={v.id}
            className="p-3 rounded-lg border border-outline-variant bg-surface"
          >
            <div className="flex justify-between text-xs text-text-secondary mb-1">
              <span>{formatTime(v.createdAt)}</span>
              <span>{v.ipAddress ?? "-"}</span>
            </div>

            <div className="text-xs mb-1">
              <span className="text-text-secondary">Ref: </span>
              {v.referer ?? "Direct"}
            </div>

            <div className="text-xs text-text-secondary truncate">
              {v.userAgent}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
