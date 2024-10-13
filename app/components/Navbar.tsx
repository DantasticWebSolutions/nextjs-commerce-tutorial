"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import Image from "next/image";
import logoBianco from "../logo-bianco.png";
import logoNero from "../logo-dark.png";
import spikeLee from "../spikeLee.jpeg";

export default function Navbar() {
  const pathname = usePathname();
  const { cartCount, handleCartClick } = useShoppingCart();
  const itemCount = cartCount ?? 0;

  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <Link href="/">
          <Image
            src={logoBianco}
            alt="Carmine Sembra Brooklyn"
            width={100}
            height={100}
            className="ms-6 block dark:hidden" // Show in light mode, hide in dark mode
          />

          {/* Dark Mode Logo */}
          <Image
            src={logoNero}
            alt="Carmine Sembra Brooklyn"
            width={100}
            height={100}
            className="ms-6 hidden dark:block" // Hide in light mode, show in dark mode
          />
        </Link>

        <div className="flex divide-x">
          <Button
            variant={"outline"}
            onClick={() => handleCartClick()}
            className="relative flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none border-0"
          >
            <ShoppingBag />
            {itemCount > 0 && (
              <span className="absolute top-1 right-1 sm:top-2 sm:right-4 md:top-4 md:right-6 indicator-item badge badge-sm bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
            <span className="hidden text-xs font-semibold text-gray-500 sm:block">
              Cart
            </span>
          </Button>
        </div>
      </div>
    </header>
  );
}
