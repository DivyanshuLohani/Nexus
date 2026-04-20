import { DbPageView } from "@/lib/db/schema";

export default function RecentViews({
    views,
}: {
    views: DbPageView[];
}) {
    return (
        <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
            <h2 className="text-sm font-medium mb-4">
                Recent Page Views
            </h2>

            <div className="overflow-x-auto">
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
                                <td className="py-2">
                                    {new Date(v.createdAt).toLocaleString()}
                                </td>
                                <td>{v.ipAddress}</td>
                                <td>{v.referer ?? "Direct"}</td>
                                <td className="truncate max-w-[150px]">
                                    {v.userAgent}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}