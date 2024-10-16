// app/error.tsx
"use client";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">
        Qualcosa è andato storto! Prova a ricaricare la pagina e se il problema
        persiste, invia un email a{" "}
        <a href="mailto:carminesembrabrooklyn@gmail.com">
          <u>carminesembrabrooklyn@gmail.com</u>
        </a>{" "}
        e allega uno screenshot della pagina per ricevere supporto.
      </h2>
      <p className="mb-4">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 rounded">
        Riprova
      </button>
    </div>
  );
}
