import Sidebar from "@/components/dashboard/sidebar";
import BottomNav from "@/components/dashboard/bottom-nav";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PricingDialogProvider } from "@/providers/PremiumDialogProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth/login?next=/dashboard");
  }

  return (
    <PricingDialogProvider>
      <div className="flex min-h-screen bg-surface">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Main */}
        <main className="flex-1">{children}</main>

        {/* Mobile Bottom Nav */}
        <BottomNav />
      </div>
    </PricingDialogProvider>
  );
}
