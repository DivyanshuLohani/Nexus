import FeedbackForm from "@/components/feedback/FeedbackForm";
import Navbar from "@/components/landing/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import { Footer } from "react-day-picker";

export const metadata: Metadata = {
  title: "Feedback | Nexus",
  description:
    "Share your ideas, bug reports, and feature requests with Nexus. Public and logged-in users can submit feedback.",
  openGraph: {
    title: "Feedback | Nexus",
    description:
      "Share your ideas, bug reports, and feature requests with Nexus.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Feedback | Nexus",
    description:
      "Share your ideas, bug reports, and feature requests with Nexus.",
  },
};

export default function FeedbackPage() {
  return (
    <>
      <Navbar />
      <main className="space-y-6 p-6 pb-20 md:pb-6">
        <div className="space-y-3 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Feedback
          </p>
          <h1 className="text-3xl font-semibold text-on-surface">
            We want to hear from you
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Whether you are visiting Nexus for the first time or already have an
            account, your feedback helps us improve the experience.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr]">
          <Card className="border border-border">
            <CardHeader>
              <CardTitle>Why your feedback matters</CardTitle>
              <CardDescription>
                Feedback is used to improve the product, fix issues, and
                prioritize enhancements.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Every message is stored securely in the database and can be
                reviewed by the Nexus team.
              </p>
              <ul className="space-y-3 text-sm text-on-surface">
                <li className="rounded-2xl border border-border bg-surface-low p-4">
                  <strong>Product ideas:</strong> Tell us what would make Nexus
                  more useful.
                </li>
                <li className="rounded-2xl border border-border bg-surface-low p-4">
                  <strong>Bug reports:</strong> Share anything that is broken or
                  confusing.
                </li>
                <li className="rounded-2xl border border-border bg-surface-low p-4">
                  <strong>Support asks:</strong> Ask for help or clarification
                  about the product.
                </li>
              </ul>
            </CardContent>
          </Card>

          <FeedbackForm context="Feedback page" />
        </div>
      </main>
      <Footer />
    </>
  );
}
