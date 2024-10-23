import { UnresolvedValueKeyframe } from "framer-motion";
import React from "react";
import { CheckCheck } from "lucide-react";

interface LineItem {
  id: string;
  description: string | undefined | null;
  quantity: number | null;
  amount_total: number | null;
}

interface OrderConfirmationProps {
  customer_name: string | null | undefined;
  customer_email: string | null | undefined;
  customer_address_line: string | null | undefined;
  customer_address_city: string | null | undefined;
  customer_address_postal_code: string | null | undefined;
  session_id: string;
  session_total: number | null;
  session_products: {
    data: LineItem[];
  };
}

const OrderConfirmation = ({
  customer_name: customerName,
  customer_email: customerEmail,
  customer_address_line: customerAddressLine,
  customer_address_city: customerAddressCity,
  customer_address_postal_code: customerAddressPostalCode,
  session_id: sessionId,
  session_products: sessionProducts,
  session_total: sessionTotal,
}: OrderConfirmationProps) => {
  const truncatedSessionId = sessionId.slice(-20);
  return (
    <section className="pt-1 pb-16 antialiased md:py-10">
      <div className="mx-auto max-w-2xl px-4 2xl:px-0">
        <CheckCheck className="text-green-600 w-16 h-16 my-6" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2">
          Pagamento completato!
        </h2>
        <p className="text-gray-500 dark:text-neutral-400 mb-6 md:mb-8">
          Il tuo ordine{" "}
          <span className="font-medium text-gray-900 dark:text-white break-all">
            {truncatedSessionId}
          </span>{" "}
          sarà elaborato e spedito al più presto. La consegna è prevista entro
          3-6 giorni lavorativi.
        </p>
        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-neutral-600 dark:bg-neutral-800 mb-6 md:mb-8">
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-neutral-400">
              Codice identificativo
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {truncatedSessionId}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-neutral-400">
              Nome
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {customerName}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-neutral-400">
              Email
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {customerEmail}
            </dd>
          </dl>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-neutral-400">
              Indirizzo
            </dt>
            <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
              {customerAddressLine}, {customerAddressCity},{" "}
              {customerAddressPostalCode}
            </dd>
          </dl>
        </div>
        <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-neutral-700 dark:bg-neutral-800 mb-6 md:mb-8">
          <h2 className="text-xl font-bold mb-4">Riepilogo Ordine</h2>
          {sessionProducts?.data.map((item) => (
            <dl
              key={item.id}
              className="sm:flex items-center justify-between gap-4"
            >
              <div className="flex gap-2">
                <dd className="font-medium text-gray-900 dark:text-white sm:text-end">
                  {item.quantity} x
                </dd>{" "}
                <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-neutral-400">
                  {item.description}
                </dt>
              </div>
              <dd className="font-bold text-gray-900 dark:text-white sm:text-end">
                € {((item.amount_total ?? 0) / 100).toFixed(2)}
              </dd>
            </dl>
          ))}
          <div className="py-3">
            <hr />
          </div>
          <dl className="sm:flex items-center justify-between gap-4">
            <dt className="font-normal mb-1 sm:mb-0 text-gray-500 dark:text-neutral-400">
              Totale
            </dt>
            <dd className="font-bold text-gray-900 dark:text-white sm:text-end">
              €{(sessionTotal! / 100).toFixed(2)}
            </dd>
          </dl>
        </div>
        <p className="text-gray-500 dark:text-neutral-400 my-6 md:my-8">
          {/* eslint-disable react/no-unescaped-entities */}
          Abbiamo inviato una conferma del tuo ordine, comprensiva di tutti i
          dettagli, al tuo indirizzo email. Ti preghiamo di controllare anche la
          cartella spam nel caso in cui l'email non fosse visibile nella posta
          in arrivo.
        </p>
        <div className="flex items-center space-x-4">
          <a
            href="/"
            className="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            Continua a fare shopping
          </a>
        </div>
      </div>
    </section>
  );
};

export default OrderConfirmation;
