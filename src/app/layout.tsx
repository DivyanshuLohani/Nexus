import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  return {
    title: "Nexus | Your Digital Identity, Simplified",
    description: "A monochromatic landscape for your professional presence. Create your surgical, high-precision link-in-bio profile.",
    openGraph: {
      title: "Nexus | Your Digital Identity, Simplified",
      description: "A monochromatic landscape for your professional presence.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Nexus | Your Digital Identity, Simplified",
      description: "A monochromatic landscape for your professional presence.",
    },
    icons: {
      icon: "/favicon.ico",
    },
    manifest: "/manifest.json",
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased `}
      data-theme="dark"
    >
      <body className="min-h-full flex flex-col text-on-surface">
        <div>
          <Toaster position="top-right" />
        </div>

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
