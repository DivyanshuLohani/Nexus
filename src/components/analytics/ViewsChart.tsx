"use client";

export default function ViewsChart({
    data,
}: {
    data: { date: string; views: number }[];
}) {
    return (
        <div className="p-4 bg-surface-low rounded-xl border border-outline-variant">
            <h2 className="text-sm font-medium mb-4">
                Views Over Time
            </h2>

            <div className="space-y-2">
                {data.map((d, i) => (
                    <div key={i} className="flex justify-between text-xs">
                        <span>{d.date}</span>
                        <span>{d.views}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}