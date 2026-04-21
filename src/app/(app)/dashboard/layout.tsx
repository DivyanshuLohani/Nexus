import Sidebar from "@/components/dashboard/sidebar";
import BottomNav from "@/components/dashboard/bottom-nav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-surface">

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main */}
            <main className="flex-1">
                {children}
            </main>

            {/* Mobile Bottom Nav */}
            <BottomNav />
        </div>
    );
}