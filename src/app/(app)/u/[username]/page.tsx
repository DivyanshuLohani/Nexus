import PublicPageView from "@/components/PublicPageView";
import { getPublicPage } from "@/lib/services/linkPage";


export default async function UserPage({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const { username } = await params;
    const data = await getPublicPage(username);

    if (!data) {
        return <div>Not found</div>;
    }

    return <PublicPageView data={data} />;
}