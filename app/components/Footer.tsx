import React from "react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
      <footer className="w-full  bg-white rounded-lg shadow m-4 dark:bg-gray-800 mb-8">
        <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <a href="/" className="hover:underline">
              Carmine Sembra Brooklyn™
            </a>{" "}
            © 2024
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a
                href="/termini-e-condizioni"
                className="hover:underline me-4 md:me-6"
              >
                Termini e condizioni
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
