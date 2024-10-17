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
    // Calculate the total price
    const totalPrice = items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    // Determine the shipping cost
    const shippingCost = totalPrice > 70 ? 0 : 5;

    // Prepare line items for Stripe
    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          images: item.images ? [item.images] : [],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Include shipping cost as a line item if applicable
    if (shippingCost > 0) {
      line_items.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Spedizione",
          },
          unit_amount: shippingCost * 100,
        },
        quantity: 1,
      });
    }

    // Create the checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}`,
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
