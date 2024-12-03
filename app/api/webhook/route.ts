import Stripe from "stripe";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false, // Вимкнення bodyParser для raw body
  },
};

export async function POST(req: Request) {
  const body = await req.text(); // Отримання raw body
  const signature = req.headers.get("Stripe-Signature") as string; // Правильний спосіб отримати заголовок

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body, 
      signature, 
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.error("Webhook signature verification failed:", error.message);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  // Обробка подій
  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      console.error("Missing metadata in session.");
      return new NextResponse(`Webhook Error: Missing metadata`, { status: 400 });
    }

    try {
      await db.purchase.create({
        data: {
          courseId: courseId,
          userId: userId,
        },
      });
    } catch (dbError: any) {
      console.error("Database error:", dbError.message);
      return new NextResponse("Database Error", { status: 500 });
    }
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
