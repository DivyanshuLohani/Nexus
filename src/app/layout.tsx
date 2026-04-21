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

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Nexus | Your Digital Identity, Simplified";
  const description =
    "Create a minimal, high-precision link-in-bio page with live editing, analytics, and complete design control.";

  const url = process.env.APP_URL || "https://your-domain.com";

  const image = `${url}/og/default.png`;

  return {
    metadataBase: new URL(url),

    title,
    description,

    applicationName: "Nexus",
    keywords: [
      "link in bio",
      "linktree alternative",
      "creator tools",
      "personal website",
      "bio links",
    ],

    authors: [{ name: "Divyanshu Lohani" }],
    creator: "Divyanshu Lohani",

    openGraph: {
      title,
      description,
      url,
      siteName: "Nexus",
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Nexus — Link in Bio Builder",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@yourhandle", // 🔥 replace
    },

    icons: {
      icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png" }],
    },

    manifest: "/manifest.json",

    // 🔥 subtle but important
    robots: {
      index: true,
      follow: true,
    },
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
