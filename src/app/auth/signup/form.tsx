"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/custom-input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const schema = z
  .object({
    username: z
      .string()
      .min(3, "Minimum 3 characters")
      .max(20, "Max 20 characters")
      .regex(/^[a-z0-9_]+$/, "Only lowercase letters, numbers, underscore"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Minimum 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const { email, password, username } = data;

    const { error } = await authClient.signUp.email(
      {
        email,
        password,
        name: username,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully");
          //  See plan details page, we push plan and tenure as query params. We can use these to show a custom message on the dashboard about the trial or something similar.
          const plan = searchParams.get("plan");
          const tenure = searchParams.get("tenure");
          if (plan) {
            // Redirect to Payments Page with the selected plan and tenure as query params
            router.push(`/checkout?plan=${plan}&tenure=${tenure}`);
            return;
          }

          router.replace("/dashboard");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );

    if (error) {
      toast.error(error.message ?? "");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label="USERNAME"
          placeholder="yourname"
          {...register("username")}
        />
        {errors.username && (
          <p className="text-xs text-red-500 mt-1">{errors.username.message}</p>
        )}
      </div>

      <div>
        <Input
          label="EMAIL ADDRESS"
          placeholder="name@example.com"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          label="PASSWORD"
          placeholder="••••••••"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Input
          label="CONFIRM PASSWORD"
          placeholder="••••••••"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Creating..." : "Create Account →"}
      </Button>
    </form>
  );
}
