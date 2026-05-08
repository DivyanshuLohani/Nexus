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
import Input from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default async function AccountSettingsPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/auth/login?next=/dashboard");
  }

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
          href={`/dashboard/${params.slug}`}
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
                  label="Username"
                  value={session.user.name ?? ""}
                  readOnly
                />
                <Input
                  label="Account ID"
                  value={session.user.id ?? ""}
                  readOnly
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="outline">Edit profile</Button>
            </CardFooter>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>
                Keep your account safe with a strong password and secure
                settings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 py-0">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-surface-low p-4">
                  <p className="text-sm font-semibold text-on-surface">
                    Password
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Change your password regularly to keep your account secure.
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface-low p-4">
                  <p className="text-sm font-semibold text-on-surface">
                    Two-factor auth
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Protect your account with an additional authentication step.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button variant="secondary">Manage security</Button>
              <Button>Change password</Button>
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
                  Pro plan · Billed monthly
                </p>
              </div>

              <div className="space-y-3 rounded-3xl border border-border bg-surface-low p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-on-surface">Support</p>
                  <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                    Fast
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Access help articles, billing support, and account recovery.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 sm:flex-row sm:justify-end">
              <Button className="w-full sm:w-auto">Billing</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Support
              </Button>
            </CardFooter>
          </Card>

          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
              <CardDescription>
                Jump to common account tasks without leaving the dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 py-0">
              <div className="space-y-3 rounded-3xl border border-border bg-surface-low p-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-on-surface">
                    Public page
                  </p>
                  <span className="text-sm text-muted-foreground">Live</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Review your public page and make updates from the dashboard.
                </p>
              </div>
              <Separator />
              <div className="grid gap-2">
                <Button variant="outline">View public page</Button>
                <Button variant="secondary">Share feedback</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
