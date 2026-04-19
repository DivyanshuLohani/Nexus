import PublicPageView from "@/components/linkPage/PublicPageView";
import { getPublicPage } from "@/lib/services/linkPage";


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

    if (!data) {
        return <div>Not found</div>;
    }

    return <PublicPageView data={data} preview={preview === "true"} />;
}