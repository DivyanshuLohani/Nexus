import Link from "next/link";
import Form from "./form";

export default function LoginPage() {
    return (
        <div className="w-full max-w-md px-4">

            <div className="text-center mb-8">
                <div className="w-11 h-11 mx-auto mb-5 rounded-sharp bg-inverse-surface flex items-center justify-center">
                    <span className="text-inverse-primary text-sm">◈</span>
                </div>
                <h1 className="text-headline-sm font-bold text-on-surface">
                    Sign in to Nexus
                </h1>
                <p className="text-body-sm text-on-surface-variant mt-2 leading-body">
                    Continue to your monochromatic curator.
                </p>
            </div>

            <div className="bg-surface-highest px-card-x py-card-y shadow-ambient">
                <Form />
            </div>


            <div className="text-center mt-6 text-body-sm text-on-surface-variant">
                Don&apos;t have an account?{" "}
                <Link href="/auth/signup" className="text-on-surface underline">
                    Register
                </Link>
            </div>


            <div className="text-center mt-6 text-body-sm text-on-surface-variant">
                Privacy Policy · Terms of Service
            </div>

        </div>
    );
}