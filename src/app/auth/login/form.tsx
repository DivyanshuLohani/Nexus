"use client";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function Form() {
    return (
        <form className="space-y-6">
            <Input
                label="EMAIL ADDRESS"
                placeholder="name@example.com"
                type="email"
            />

            <Input
                label="PASSWORD"
                placeholder="••••••••"
                type="password"
                rightText="Forgot?"
            />

            <Button variant="primary" type="submit" className="mt-6">
                Sign In
            </Button>
        </form>
    );
}