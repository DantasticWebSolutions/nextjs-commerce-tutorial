"use client";

import { useShoppingCart } from "use-shopping-cart";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";

// Initialize Stripe with the public key from the environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

// Define prop types
interface CheckoutButtonProps {
  shippingCost: number;
}

export default function CheckoutButton({ shippingCost }: CheckoutButtonProps) {
  const { cartDetails, totalPrice } = useShoppingCart();
  const [loading, setLoading] = useState(false);

  const cartTotalPrice = totalPrice ?? 0;

  // Handler to initiate the checkout process
  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to initialize");
      setLoading(false);
      return;
    }

    // Prepare line items to send to the API route
    const lineItems = Object.values(cartDetails ?? {}).map((entry) => ({
      name: entry.name,
      price: entry.price,
      quantity: entry.quantity,
      size: entry.size,
    }));

    try {
      // Send request to the backend to create a checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lineItems }),
      });

      console.log(response.body);

      const { sessionId } = await response.json();

      // Redirect to the Stripe Checkout page using the session ID
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result?.error) {
        console.error("Error redirecting to checkout:", result.error.message);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={cartTotalPrice === 0 || loading}
      className="text-white py-2 px-4 rounded disabled:opacity-50 w-full"
    >
      {loading ? "In attesa..." : "Compra Ora"}
    </Button>
  );
}
