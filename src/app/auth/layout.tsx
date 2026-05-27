import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="bg-surface text-text-primary min-h-screen flex-col flex items-center justify-center">
      {children}
      <div className="text-center mt-6 text-body-sm text-on-surface-variant">
        <Link href="/privacy" className="hover:underline">
          Privacy Policy
        </Link>

        {" · "}

        <Link href="/terms" className="hover:underline">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}
