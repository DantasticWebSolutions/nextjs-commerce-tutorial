// app/error.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error caught by Error Boundary:", error);
  }, [error]);

  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 min-h-[80vh] flex flex-col justify-center">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            500
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Errore Server Interno.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Qualcosa è andato storto! Prova a ricaricare la pagina e se il
            problema persiste, invia un email a{" "}
            <a href="mailto:carminesembrabrooklyn@gmail.com">
              <u>carminesembrabrooklyn@gmail.com</u>
            </a>{" "}
            e allega uno screenshot della pagina per ricevere supporto.
          </p>
          <div className="space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-neutral-700 dark:bg-neutral-800 mb-6 md:mb-8">
            <p>{error.message}</p>
          </div>
          <Button
            onClick={() => reset()}
            className="px-4 py-2 rounded text-white"
          >
            Riprova
          </Button>
        </div>
      </div>
    </section>
  );
}
