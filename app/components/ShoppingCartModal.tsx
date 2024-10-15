"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CheckoutButton from "./CheckoutButton";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import memeJohnTravolta from "../john-travolta-meme.gif";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    incrementItem,
    decrementItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  // Ensure totalPrice is a number
  const cartTotalPrice = totalPrice ?? 0;

  // Calculate shipping cost and total with shipping
  const shippingCost = cartTotalPrice > 90 ? 0 : 5;
  const totalWithShipping = cartTotalPrice + shippingCost;

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="bg-background sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Carello</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <div className="flex flex-col justify-center items-center min-h-[500px]">
                  <h1 className="py-6 text-center">
                    Non hai ancora aggiunto nessun prodotto al carello
                  </h1>
                  <Image
                    src={memeJohnTravolta}
                    alt="Non ci sono prodotti"
                    priority={true}
                    width={300}
                    height={300}
                  />
                </div>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border">
                        <Image
                          src={entry.image as string}
                          alt="Product image"
                          width={100}
                          height={100}
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">€{entry.price}.00</p>
                          </div>
                        </div>

                        <div className="flex flex-1 items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => decrementItem(entry.id)}
                              disabled={entry.quantity <= 1}
                              className="p-1 border border-primary rounded text-primary disabled:opacity-50 w-[40px] h-[40px]"
                            >
                              <span>-</span>
                            </button>
                            <span className="min-w-[20px] flex flex-column justify-center text-lg">
                              {entry.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => incrementItem(entry.id)}
                              className="p-1 border border-primary text-primary rounded w-[40px] h-[40px]"
                            >
                              <span>+</span>
                            </button>
                          </div>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-primary hover:text-primary/80 rounded p-2 me-1"
                            >
                              Rimuovi
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>€{cartTotalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <div>
                <p>Spedizione:</p>
                <p className="text-xs">Gratis per ordini superiori a 90.00€</p>
              </div>
              <p>€{shippingCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Totale:</p>
              <p>€{totalWithShipping.toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <CheckoutButton shippingCost={shippingCost} />
            </div>

            <div className="mt-3 flex justify-center text-center text-sm text-gray-500">
              <button
                onClick={() => handleCartClick()}
                className="border border-primary py-2 px-4 rounded w-full font-medium text-primary hover:text-primary/80"
              >
                Continua a fare Shopping
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
