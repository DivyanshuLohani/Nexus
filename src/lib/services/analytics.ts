import { nanoid } from "nanoid";
import { pagesTable, pageView } from "../db/schema";
import db from "../db/drizzle";
import { desc, eq, sql } from "drizzle-orm";

export async function addPageView(
  pageId: string,
  ipAddress: string,
  userAgent: string,
  referer: string,
) {
  await db.insert(pageView).values({
    id: nanoid(),
    pageId,
    ipAddress,
    userAgent,
    referer,
  });
}

export async function getAnalyticsData(slug: string) {
  // get page
  const page = await db
    .select()
    .from(pagesTable)
    .where(eq(pagesTable.slug, slug))
    .limit(1);

  if (!page[0]) return null;

  const pageId = page[0].id;

  // total views
  const totalViews = await db
    .select({ count: sql<number>`count(*)` })
    .from(pageView)
    .where(eq(pageView.pageId, pageId));

  // chart data (last 30 days)
  const chart = await db.execute(sql`
    SELECT DATE(created_at) as date, COUNT(*) as views
    FROM page_views
    WHERE "pageId" = ${pageId}
    GROUP BY date
    ORDER BY date ASC
  `);

  // recent views
  const recent = await db
    .select()
    .from(pageView)
    .where(eq(pageView.pageId, pageId))
    .orderBy(desc(pageView.createdAt))
    .limit(10);

  return {
    stats: {
      totalViews: totalViews[0]?.count ?? 0,
    },
    chart: chart.rows as { date: string; views: number }[],
    recent,
  };
}
