// app/api/orders/fetch-from-stripe/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function GET() {
  try {
    // Define the statuses you want to fetch
    const statuses = ["open", "complete", "expired"];

    // Fetch sessions with various statuses explicitly and combine them
    const sessionPromises = statuses.map((status) =>
      stripe.checkout.sessions.list({
        limit: 100,
        status: status as Stripe.Checkout.SessionListParams.Status,
        expand: [
          "data.line_items",
          "data.payment_intent",
          "data.payment_intent.shipping",
          "data.customer",
          "data.customer_details",
        ],
      })
    );

    // Await all promises and merge the results into a single list
    const sessionResults = await Promise.all(sessionPromises);
    const allSessions = sessionResults.flatMap((result) => result.data);

    // Check if the data is in the expected format
    if (!Array.isArray(allSessions)) {
      console.error("Unexpected data format from Stripe:", allSessions);
      return NextResponse.json(
        { error: "Unexpected data format from Stripe", data: allSessions },
        { status: 500 }
      );
    }

    return NextResponse.json(allSessions);
  } catch (error) {
    const errorMessage = (error as Error).message || "Unknown error";
    console.error("Error fetching orders from Stripe:", errorMessage);
    return NextResponse.json(
      { error: "Failed to fetch orders", details: errorMessage },
      { status: 500 }
    );
  }
}
