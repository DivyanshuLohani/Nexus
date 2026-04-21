import Link from "next/link";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-white text-black">

            {/* Navbar */}
            <header className="sticky top-0 bg-white flex justify-between items-center px-8 py-6 border-b border-black">
                <Link href="/" className="font-semibold text-lg">
                    Nexus
                </Link>

                <nav className="flex items-center gap-6 text-sm">
                    <Link href="/#features">Features</Link>
                    <Link href="/#pricing">Pricing</Link>

                    <Link
                        href="/auth/signup"
                        className="bg-black text-white px-4 py-2 text-xs tracking-wide"
                    >
                        GET STARTED
                    </Link>
                </nav>
            </header>

            {/* Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-black px-8 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
                <div>
                    <p className="font-medium">Nexus</p>
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Nexus. Monochromatic Precision.
                    </p>
                </div>

                <div className="flex gap-6 mt-4 md:mt-0">
                    <Link href="/terms">Terms</Link>
                    <Link href="/privacy">Privacy</Link>
                    <a href="https://x.com/DivyanshuLohani" >Twitter</a>
                </div>
            </footer>
        </div>
    );
}