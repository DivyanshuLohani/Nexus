export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-surface">
            {/* Sidebar */}
            {/* <aside className="w-64 bg-surface-low p-4 flex flex-col justify-between">
                <div>
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold">LinkNest</h2>
                        <p className="text-xs text-text-secondary">
                            Editorial Tier
                        </p>
                    </div>

                    <nav className="space-y-2">
                        <div className="bg-surface-high p-2 rounded">
                            Links
                        </div>
                        <div className="p-2 text-text-secondary">
                            Analytics
                        </div>
                        <div className="p-2 text-text-secondary">
                            Appearance
                        </div>
                        <div className="p-2 text-text-secondary">
                            Settings
                        </div>
                    </nav>
                </div>

                <div className="space-y-4">
                    <button className="w-full bg-black text-white py-2 rounded">
                        Upgrade to Pro
                    </button>

                    <div className="text-xs text-text-secondary space-y-2">
                        <div>Help</div>
                        <div>Logout</div>
                    </div>
                </div>
            </aside> */}

            {/* Main */}
            <main className="flex-1 p-4">{children}</main>
        </div>
    );
}