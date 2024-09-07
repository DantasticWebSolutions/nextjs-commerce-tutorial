// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16", // Ensure the latest API version is used
});

// Define and export the POST method to handle creating the checkout session
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { items } = await req.json();

    // Create the checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "eur",
          product_data: {
            name: item.name,
            images: [item.images],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
      })),
      mode: "payment",
      success_url: `${req.nextUrl.origin}/stripe/success?status=success`,
      cancel_url: `${req.nextUrl.origin}/stripe/error`,
      shipping_address_collection: {
        allowed_countries: ["IT"],
      },
    });

    // Return the session ID as a JSON response
    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    // Handle any errors that occur during session creation
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
