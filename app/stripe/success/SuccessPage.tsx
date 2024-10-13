"use client";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

export default function StripeSuccess() {
  const { clearCart } = useShoppingCart();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<
    null | boolean
  >(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session_id) {
      // Fetch session details from the backend
      fetch(`/api/verify-payment?session_id=${session_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.paymentStatus === "paid") {
            clearCart();
            setIsPaymentSuccessful(true);
          } else {
            setIsPaymentSuccessful(false);
          }
        })
        .catch((error) => {
          console.error("Error verifying payment:", error);
          setErrorMessage(error.message || "An error occurred");
          setIsPaymentSuccessful(false);
        });
    }
  }, [session_id, clearCart]);

  // Handle the loading state
  if (isPaymentSuccessful === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Verifying payment...</p>
      </div>
    );
  }

  // Handle the case where session_id is missing or payment verification failed
  if (!isPaymentSuccessful) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-center">
          Payment verification failed: {errorMessage}. Please contact support.
        </p>
      </div>
    );
  }

  // Payment was successful
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for you pruchase We hope you enjoy it
          </p>
          <p>Have a great day!</p>

          <Button asChild className="mt-5">
            <Link href="/">GO back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
