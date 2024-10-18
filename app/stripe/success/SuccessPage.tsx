"use client";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import Stripe from "stripe";
import OrderConfirmation from "@/app/components/OrderConfirmation";

async function fetchSession(
  sessionId: string
): Promise<Stripe.Checkout.Session> {
  const res = await fetch(`/api/get-session?session_id=${sessionId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch session");
  }
  return res.json();
}

export default function StripeSuccess() {
  const { clearCart } = useShoppingCart();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState<
    null | boolean
  >(null);
  const [sessionData, setSessionData] =
    useState<Stripe.Checkout.Session | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (session_id) {
      // Fetch session details from the backend
      fetchSession(session_id)
        .then((session) => {
          if (session.payment_status === "paid") {
            clearCart();
            setIsPaymentSuccessful(true);
            setSessionData(session);
          } else {
            setIsPaymentSuccessful(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching session:", error);
          setErrorMessage(error.message || "An error occurred");
          setIsPaymentSuccessful(false);
        });
    } else {
      setIsPaymentSuccessful(false);
    }
  }, [session_id, clearCart]);

  // useEffect(() => {
  //   if (session_id) {
  //     // Fetch session details from the backend
  //     fetch(`/api/verify-payment?session_id=${session_id}`)
  //       .then((res) => res.json())
  //       .then((session) => {
  //         if (session.paymentStatus === "paid") {
  //           clearCart();
  //           setIsPaymentSuccessful(true);
  //           setSessionData(session);
  //         } else {
  //           setIsPaymentSuccessful(false);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error verifying payment:", error);
  //         setErrorMessage(error.message || "An error occurred");
  //         setIsPaymentSuccessful(false);
  //       });
  //   } else {
  //     setIsPaymentSuccessful(false);
  //   }
  // }, [session_id, clearCart]);

  // Handle the loading state
  if (isPaymentSuccessful === null) {
    return (
      <>
        <div className="min-h-[70vh] flex flex-col items-center justify-center">
          <Loader className="animate-spin h-12 w-12 text-gray-500 mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            Stiamo verificando il pagamento...
          </p>
        </div>
      </>
    );
  }

  // Handle the case where session_id is missing or payment verification failed
  if (!isPaymentSuccessful) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <p className="text-center">
          Verifica pagamento fallita: {errorMessage}. Per favore contatta il
          supporto tecnico a{" "}
          <a href="mailto:carminesembrabrooklyn@gmail.com">
            <u>carminesembrabrooklyn@gmail.com</u>
          </a>
          .
        </p>
      </div>
    );
  }

  // Payment was successful
  if (isPaymentSuccessful && sessionData) {
    if (!sessionData.line_items) {
      return (
        <div className="min-h-[70vh] flex items-center justify-center">
          <p className="text-center">
            {/* eslint-disable react/no-unescaped-entities */}
            Errore nel recuperare i dettagli dell'ordine. Per favore contatta il
            supporto tecnico.
          </p>
        </div>
      );
    }
    return (
      <>
        <OrderConfirmation
          customer_name={sessionData.customer_details?.name}
          session_id={sessionData.id}
          customer_email={sessionData.customer_details?.email}
          customer_address_line={sessionData.customer_details?.address?.line1}
          customer_address_city={sessionData.customer_details?.address?.city}
          customer_address_postal_code={
            sessionData.customer_details?.address?.postal_code
          }
          session_total={sessionData.amount_total}
          session_products={sessionData.line_items}
        />
      </>
    );
  }
}
