"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// ✅ Validation schema
const schema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Minimum 8 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Form() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        const { email, password } = data;

        const { error } = await authClient.signIn.email(
            {
                email,
                password,
                callbackURL: "/dashboard",
            },
            {
                onSuccess: () => {
                    toast.success("Welcome back");
                    router.replace("/dashboard");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
            }
        );

        if (error) {
            console.error(error);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="EMAIL ADDRESS"
                placeholder="name@example.com"
                type="email"
                error={errors.email?.message}
                {...register("email")}
            />

            <Input
                label="PASSWORD"
                placeholder="••••••••"
                type="password"
                rightText="Forgot?"
                error={errors.password?.message}
                {...register("password")}
            />

            <Button
                variant="primary"
                type="submit"
                className="mt-6"
                disabled={isSubmitting}
            >
                {isSubmitting ? "Signing in..." : "Sign In →"}
            </Button>
        </form>
    );
}