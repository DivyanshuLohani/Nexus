import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserDefaultPage } from "@/lib/services/linkPage";



export default async function DashboardPage() {
    // Get user id from better auth session
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }

    const userId = session.user.id;

    const page = await getUserDefaultPage(userId);

    // redirect to /dashboard/<page slug>
    if (page) {
        const { redirect } = await import("next/navigation");
        redirect(`/dashboard/${page.slug}`);
    }


    return null;
}