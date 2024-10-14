import React from "react";

const PrivacyPolicyPage = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">Informativa sulla Privacy</h1>
      <p className="mb-2">
        <strong>Ultimo aggiornamento:</strong> 14/10/2024
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        La presente Informativa sulla Privacy descrive come{" "}
        <strong>Carmine Sembra Brooklyn</strong> ("noi", "ci" o "nostro")
        raccoglie, utilizza e protegge le informazioni personali degli utenti
        ("tu" o "tuo") del nostro sito web{" "}
        <strong>https://carmine-sembra-brooklyn.vercel.app/</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Raccolta dei Dati Personali
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Raccogliamo le seguenti informazioni personali durante il processo di
        checkout tramite Stripe:
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>Nome e cognome</li>
        <li>Indirizzo di spedizione</li>
        <li>Indirizzo email</li>
        <li>Numero di telefono (se applicabile)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Utilizzo dei Dati Personali
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Utilizziamo le tue informazioni personali esclusivamente per:
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>Elaborare e spedire i tuoi ordini</li>
        <li>Fornire assistenza clienti</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Condivisione dei Dati con Terze Parti
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        I tuoi dati sono condivisi solo con:
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>
          <strong>Stripe</strong>, per elaborare i pagamenti in modo sicuro
        </li>
        <li>
          Servizi di spedizione, per consegnare i prodotti al tuo indirizzo
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Conservazione dei Dati
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Conserviamo i tuoi dati personali solo per il tempo necessario a
        soddisfare le finalità descritte in questa Informativa.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Diritti dell'Utente</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Hai il diritto di accedere, rettificare o cancellare i tuoi dati
        personali in nostro possesso. Per esercitare questi diritti, contattaci
        all'indirizzo email <strong>carminesembrabrooklyn@gmail.com</strong>.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contatti</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Se hai domande sulla presente Informativa sulla Privacy, puoi
        contattarci a:
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>
          <strong>Email:</strong> carminesembrabrooklyn@gmail.com
        </li>
        <li>
          <strong>Instagram:</strong> @carmine.brklyn
        </li>
      </ul>
    </div>
  );
};

export default PrivacyPolicyPage;
