import FeedbackForm from "@/components/feedback/FeedbackForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | Nexus",
  description:
    "Contact Nexus support and submit feedback from the support page. Public and logged-in visitors can share their requests.",
  openGraph: {
    title: "Support | Nexus",
    description:
      "Contact Nexus support and submit feedback from the support page.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Support | Nexus",
    description:
      "Contact Nexus support and submit feedback from the support page.",
  },
};

export default function SupportPage() {
  return (
    <main className="space-y-6 p-6 pb-20 md:pb-6">
      <div className="space-y-3 max-w-3xl">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Support
        </p>
        <h1 className="text-3xl font-semibold text-on-surface">
          Need help? Share your request.
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Use this page to ask for help, report an issue, or submit product
          feedback. Nexus stores your submission in the database so the team can
          follow up.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.55fr]">
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>Support resources</CardTitle>
            <CardDescription>
              The fastest way to get help is by leaving your details and message
              below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-3xl border border-border bg-surface-low p-4">
              <p className="text-sm font-semibold text-on-surface">
                Looking for quick answers?
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Check the docs or reach out through feedback if you need
                personalized help.
              </p>
            </div>
            <div className="rounded-3xl border border-border bg-surface-low p-4">
              <p className="text-sm font-semibold text-on-surface">
                Share context
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                The more details you provide, the faster we can respond to bugs
                and feature requests.
              </p>
            </div>
          </CardContent>
        </Card>

        <FeedbackForm context="Support page" />
      </div>
    </main>
  );
}
