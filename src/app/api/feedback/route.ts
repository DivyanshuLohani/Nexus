import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createFeedback } from "@/lib/services/feedback";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  const payload = await request.json();

  const message =
    typeof payload?.message === "string" ? payload.message.trim() : "";
  if (!message) {
    return NextResponse.json(
      { error: "Please provide a message for your feedback." },
      { status: 400 },
    );
  }

  const name = typeof payload?.name === "string" ? payload.name.trim() : null;
  const email =
    typeof payload?.email === "string" ? payload.email.trim() : null;
  const context =
    typeof payload?.context === "string" ? payload.context.trim() : "feedback";

  try {
    await createFeedback({
      userId: session?.user?.id ?? null,
      name: name || session?.user?.name || null,
      email: email || session?.user?.email || null,
      message,
      context,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { error: "Unable to save feedback at this time." },
      { status: 500 },
    );
  }
}
