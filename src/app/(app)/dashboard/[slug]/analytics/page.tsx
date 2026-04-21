import { getAnalyticsData } from "@/lib/services/analytics";

import StatsCards from "@/components/analytics/StatsCard";
import ViewsChart from "@/components/analytics/ViewsChart";
import RecentViews from "@/components/analytics/RecentViews";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) return null;

  const data = await getAnalyticsData(slug, session.user.id);
  if (!data) return null;

  return (
    <div className="space-y-6 p-6 pb-20 md:pb-6">
      <h1 className="text-xl font-semibold">Analytics</h1>

      <StatsCards stats={data.stats} />

      <ViewsChart data={data.chart} />

      <RecentViews views={data.recent} />
    </div>
  );
}
