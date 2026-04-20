import PublicPageView from "@/components/linkPage/PublicPageView";
import { addPageView } from "@/lib/services/analytics";
import { getPublicPage } from "@/lib/services/linkPage";
import { headers } from "next/headers";


export default async function UserPage({
    params,
    searchParams,
}: {
    params: Promise<{ username: string }>;
    searchParams: Promise<{ preview: string }>;
}) {
    const { username } = await params;
    const { preview } = await searchParams;

    const data = await getPublicPage(username);

    // Add analytics if not preview
    if (!preview && data) {
        const headersList = await headers();
        addPageView(
            data.page.id,
            headersList.get('x-forwarded-for')?.split(',')[0] ?? 'Unknown',
            headersList.get('user-agent') ?? 'Unknown',
            headersList.get('referer') ?? 'Unknown',
        );
    }


    if (!data) {
        return <div>Not found</div>;
    }

    return <PublicPageView data={data} preview={preview === "true"} />;
}