import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="max-w-4xl mx-auto my-10 p-6 rounded shadow">
      {/* eslint-disable react/no-unescaped-entities */}
      <h1 className="text-3xl font-bold mb-4">
        Termini e Condizioni di Vendita
      </h1>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        <strong>Ultimo aggiornamento:</strong> 14/10/2024
      </p>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Benvenuto su <strong>Carmine Sembra Brooklyn</strong>. Effettuando un
        acquisto sul nostro sito, accetti i seguenti termini e condizioni.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Prodotti</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Vendiamo magliette e abbigliamento di alta qualità. Le immagini dei
        prodotti sono indicative; potrebbero esserci lievi differenze nel
        prodotto finale.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Prezzi e Pagamenti</h2>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>
          Tutti i prezzi sono espressi in <strong>Euro</strong> e includono le
          tasse applicabili.
        </li>
        <li>
          I pagamenti sono elaborati in modo sicuro tramite{" "}
          <strong>Stripe</strong>.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Spedizione</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Offriamo spedizione esclusivamente in <strong>Italia</strong>. I tempi
        di consegna stimati sono di <strong>3-6</strong> giorni lavorativi.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Resi e Rimborsi</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Non offriamo resi o rimborsi a meno che il prodotto non sia difettoso o
        danneggiato. In caso di prodotto difettoso, contattaci allindirizzo
        email <strong>carminesembrabrooklyn@gmail.com</strong> o su Instagram
        <strong>@carmine.brklyn</strong> entro 14 giorni dalla ricezione.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Limitazione di Responsabilità
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Non siamo responsabili per eventuali ritardi nella consegna dovuti a
        cause di forza maggiore.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contatti</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        <strong>Email:</strong> carminesembrabrooklyn@gmail.com <br />
        <strong>Instagram:</strong> @carmine.brklyn
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Risoluzione delle Controversie Online
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        In caso di controversia, informiamo i consumatori che è disponibile una
        piattaforma online per la risoluzione alternativa delle dispute, fornita
        dalla Commissione Europea.
      </p>
      <a
        href="https://ec.europa.eu/consumers/odr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Piattaforma ODR
      </a>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Diritto di Recesso</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Ai sensi dell'articolo 59 del Codice del Consumo, il diritto di recesso
        non si applica per i beni confezionati su misura o chiaramente
        personalizzati.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">
        Resi per Prodotti Difettosi
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Se il prodotto ricevuto è difettoso o danneggiato:
      </p>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4">
        <li>
          Contattaci entro 14 giorni dalla ricezione all'indirizzo{" "}
          <strong>carminesembrabrooklyn@gmail.com</strong> o su Instagram{" "}
          <strong>@carmine.brklyn</strong>.
        </li>
        <li>
          Fornisci il numero d'ordine e una descrizione del difetto,
          possibilmente con foto.
        </li>
        <li>
          Ti guideremo attraverso il processo di restituzione o sostituzione.
        </li>
      </ul>
    </div>
  );
};

export default TermsAndConditionsPage;
