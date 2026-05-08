import Link from "next/link";
import Form from "./form";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    plan?: string;
    tenure?: "monthly" | "yearly";
  }>;
}

export default async function SignupPage({ searchParams }: Props) {
  // Get session if session is there redirect to dashboard
  const params = await searchParams;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    let url = "/dashboard";
    const plan = params.plan;
    const tenure = params.tenure;
    if (plan && tenure) {
      url = `/checkout?plan=${plan}&tenure=${tenure}`;
    }
    redirect(url);
  }

  return (
    <div className="w-full max-w-md px-4">
      <div className="text-center mb-8">
        <div className="w-11 h-11 mx-auto mb-5 rounded-sharp bg-inverse-surface flex items-center justify-center">
          <span className="text-inverse-primary text-sm">◈</span>
        </div>
        <h1 className="text-headline-sm font-bold text-on-surface">
          Create your Nexus
        </h1>
        <p className="text-body-sm text-on-surface-variant mt-2 leading-body">
          Start your monochromatic curator.
        </p>
      </div>

      <div className="bg-surface-highest px-card-x py-card-y shadow-ambient">
        <Suspense
          fallback={<div className="text-center py-10">Loading...</div>}
        >
          <Form />
        </Suspense>
      </div>

      <div className="text-center mt-6 text-body-sm text-on-surface-variant">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-on-surface underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
