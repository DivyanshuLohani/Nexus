import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CheckoutHeader() {
  return (
    <div className="mb-8">
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition"
      >
        <ArrowLeft size={18} />
        Back
      </Link>
    </div>
  );
}
