"use client";
import { DbPage } from "@/lib/db/schema";
import { sanitizeBackground } from "@/lib/background-validator";
import { useEffect } from "react";

export default function PageContainer({
  page,
  children,
  // preview = false,
}: {
  page: DbPage;
  children: React.ReactNode;
  preview?: boolean;
}) {
  useEffect(() => {
    document.body.classList.add("custom-scrollbar");
    return () => {
      document.body.classList.remove("custom-scrollbar");
    };
  }, []);

  return (
    <div
      style={{
        background: sanitizeBackground(page.background ?? "#0a0a0a"),
        color: page.textColor ?? "#ffffff",
      }}
      className={`
                relative flex justify-center
                py-6 min-h-screen
            `}
    >
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      <div className="w-full max-w-sm px-4 text-center">{children}</div>
    </div>
  );
}
