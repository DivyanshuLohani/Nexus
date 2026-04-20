import { getAnalyticsData } from "@/lib/services/analytics";

import StatsCards from "@/components/analytics/StatsCard";
import ViewsChart from "@/components/analytics/ViewsChart";
import RecentViews from "@/components/analytics/RecentViews";

export default async function AnalyticsPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const data = await getAnalyticsData(slug);
    if (!data) return null;


    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Analytics</h1>

            <StatsCards stats={data.stats} />

            <ViewsChart data={data.chart} />

            <RecentViews views={data.recent} />
        </div>
    );
}