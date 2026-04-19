"use client";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function SignupForm() {
    return (
        <form className="space-y-6">
            <Input
                label="USERNAME"
                placeholder="yourname"
                type="text"
            />

            <Input
                label="EMAIL ADDRESS"
                placeholder="name@example.com"
                type="email"
            />

            <Input
                label="PASSWORD"
                placeholder="••••••••"
                type="password"
            />

            <Input
                label="CONFIRM PASSWORD"
                placeholder="••••••••"
                type="password"
            />

            <Button variant="primary" type="submit">
                Create Account
            </Button>
        </form>
    );
}