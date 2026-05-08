"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FeedbackFormProps {
  context: string;
}

interface FeedbackFormValues {
  name: string;
  email: string;
  message: string;
}

export default function FeedbackForm({ context }: FeedbackFormProps) {
  const { data, isPending } = authClient.useSession();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<FeedbackFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && data?.user) {
      setValue("name", data.user.name ?? "");
      setValue("email", data.user.email ?? "");
    }
  }, [data, isPending, setValue]);

  const onSubmit = async (values: FeedbackFormValues) => {
    setStatus("idle");
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          context,
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error || "Unable to submit feedback.");
      }

      setStatus("success");
      reset({
        name: values.name,
        email: values.email,
        message: "",
      });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <div className="space-y-6 rounded-3xl border border-border bg-surface-low p-6 shadow-sm">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          Send feedback
        </p>
        <h2 className="text-2xl font-semibold text-on-surface">
          Tell us what you think
        </h2>
        <p className="text-sm leading-6 text-muted-foreground">
          Share your ideas, report bugs, or ask for support. All submissions are
          stored in the database.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 md:grid-cols-2">
          <Input label="Name" {...register("name")} />
          <Input label="Email" type="email" {...register("email")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-on-surface">Message</label>
          <Textarea
            {...register("message", { required: true })}
            placeholder="How can we help?"
            className="min-h-40"
          />
        </div>

        {status === "success" && (
          <p className="text-sm text-emerald-600">
            Thanks — your feedback has been sent.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-destructive">
            {error || "Unable to send feedback."}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Submit feedback"}
        </Button>
      </form>
    </div>
  );
}
