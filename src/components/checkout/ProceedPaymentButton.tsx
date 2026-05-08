"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  planSlug: string;
  planName: string;
  tenure: "monthly" | "yearly";
  amount: number;
}

const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Razorpay checkout SDK."));

    document.body.appendChild(script);
  });

export default function ProceedPaymentButton({
  planSlug,
  planName,
  tenure,
}: Props) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const openCheckout = async () => {
    setIsProcessing(true);

    try {
      const response = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ planSlug, tenure }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Unable to create payment order.");
      }

      await loadScript("https://checkout.razorpay.com/v1/checkout.js");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Razorpay = (window as any).Razorpay;
      if (!Razorpay) {
        throw new Error("Razorpay checkout failed to initialize.");
      }

      const options = {
        key: data.key,
        amount: data.amount,
        currency: data.currency,
        name: "Nexus",
        description: `${planName} plan - ${tenure}`,
        order_id: data.orderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(response),
            });

            if (!verifyRes.ok) {
              const errorData = await verifyRes.json();
              throw new Error(
                errorData?.error || "Payment verification failed.",
              );
            }

            toast.success("Payment successful! Your plan is now active.");
            router.push(
              "/dashboard?planActivated=true&planName=" +
                encodeURIComponent(planName) +
                "&tenure=" +
                encodeURIComponent(tenure),
            );
          } catch (error) {
            console.error(error);
            toast.error(
              error instanceof Error
                ? error.message
                : "Payment completed, but verification failed.",
            );
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const checkout = new Razorpay(options);
      checkout.open();
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to start payment. Please try again.",
      );
      setIsProcessing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={openCheckout}
      disabled={isProcessing}
      className="
        w-full mt-6
        bg-primary text-primary-foreground
        py-4 rounded-md
        font-semibold
        hover:bg-primary/90
        transition
        disabled:cursor-not-allowed disabled:opacity-60
      "
    >
      {isProcessing ? "Processing payment..." : "Proceed to Pay"}
    </button>
  );
}
