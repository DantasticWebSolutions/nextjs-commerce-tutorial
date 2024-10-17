"use client";
import { useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import Stripe from "stripe";

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
      <div className="min-h-[70vh] flex items-center justify-center">
        <p>Stiamo verificando il pagamento...</p>
      </div>
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
    return (
      <div className="min-h-[70vh]">
        <div className="mt-32 md:max-w-[50vw] mx-auto">
          <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
          <div className="text-center">
            <h3 className="md:text-2xl text-base font-semibold">
              Pagamento Completato!
            </h3>
            <p className="my-2">
              Grazie per il tuo acquisto,{" "}
              {sessionData.customer_details?.name || ""}.
            </p>
            <p>
              speriamo di vederti ai nostri eventi indossando i tuoi nuovi
              acquisti.
            </p>

            {/* Display order information */}
            <div className="mt-6 text-left">
              <h4 className="text-lg font-semibold">Dettagli ordine:</h4>
              <p>
                <strong>ID ordine:</strong> {sessionData.id}
              </p>
              <p>
                <strong>Email:</strong> {sessionData.customer_details?.email}
              </p>
              <p>
                <strong>Totale ordine:</strong> €
                {(sessionData.amount_total! / 100).toFixed(2)}
              </p>

              {/* Display Line Items */}
              <h5 className="mt-4 text-md font-semibold">Prodotti comprati:</h5>
              <ul className="list-disc ml-5">
                {sessionData.line_items?.data.map((item) => (
                  <li key={item.id}>
                    {item.quantity} x {item.description} - €
                    {((item.amount_total ?? 0) / 100).toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 text-left">
              Abbiamo inoltrato un email con tutti i dettagli dell'ordine al tuo
              indirizzo email. Controlla anche la tua cartella spam se non trovi
              l'email.
            </p>
            <p className="mt-5 text-left">
              I tuoi prodotti verranno consegnati entro 3-6 giorni lavorativi.
            </p>
            <Button asChild className="mt-5">
              <Link href="/">Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  // return (
  //   <div className="h-[70vh] flex flex-col justify-center items-center">
  //     <div className="mt-6 md:max-w-[50vw] mx-auto">
  //       <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
  //       <div className="text-center">
  //         <h3 className="md:text-2xl text-base font-semibold text-center">
  //           Payment Done!
  //         </h3>
  //         <p className="text-gray-600 my-2">
  //           Thank you for you pruchase We hope you enjoy it
  //         </p>
  //         <p>Have a great day!</p>

  //         <Button asChild className="mt-5">
  //           <Link href="/">GO back</Link>
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // );
}
