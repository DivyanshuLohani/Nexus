import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Input from "@/components/ui/custom-input";
import { ChangePasswordDialog } from "@/components/account/change-password";
function formatPlanValidUntil(date: string | Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export default async function AccountSettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/auth/login?next=/dashboard");
  }
  const { slug } = await params;

  return (
    <main className="space-y-6 p-6 pb-20 md:pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Settings
          </p>
          <h1 className="text-3xl font-semibold text-on-surface">Account</h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage your profile, billing, and security settings for your Nexus
            account.
          </p>
        </div>
        <Link
          href={`/dashboard/${slug}`}
          className="inline-flex items-center rounded-md border border-border bg-surface-low px-4 py-2 text-sm font-medium text-on-surface transition hover:bg-surface-high"
        >
          Back to dashboard
        </Link>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Your account name, email, and user details are shown here.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 py-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="Name" value={session.user.name ?? ""} readOnly />
                <Input
                  label="Email"
                  value={session.user.email ?? ""}
                  readOnly
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Account ID"
                  value={session.user.id ?? ""}
                  readOnly
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <ChangePasswordDialog />
              <Button variant="outline">Edit profile</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Account overview</CardTitle>
              <CardDescription>
                See your plan details and quick actions in one place.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 py-0">
              <div className="rounded-3xl border border-border bg-surface-low p-4">
                <p className="text-sm font-medium text-on-surface">Plan</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {session.user.plan
                    ? `${session.user.plan.name} • Valid until ${formatPlanValidUntil(
                        (session.user as any).activePlanValidUntil,
                      )}`
                    : "Free"}{" "}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="outline" className="w-full sm:w-auto">
                Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
