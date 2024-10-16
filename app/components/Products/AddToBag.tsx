"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../../lib/sanity";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
}: ProductCart) {
  const { addItem, cartDetails, incrementItem, handleCartClick } =
    useShoppingCart();
  const [selectedSize, setSelectedSize] = useState("");

  // Function to handle adding item to cart
  const handleAddToCart = () => {
    // Create a unique id for the product with size
    const productId = `${name}-${selectedSize}`;

    // Check if an item with the same id and size exists in the cart
    const existingItem = Object.values(cartDetails ?? {}).find(
      (item) => item.id === productId
    );

    // If item exists, increase quantity, otherwise add as a new item
    if (existingItem) {
      incrementItem(productId);
    } else {
      addItem({
        id: productId, // Unique id for different sizes
        name: `${name} - ${selectedSize}`, // Append size to name
        description,
        price: price, // Convert to cents for Stripe
        currency,
        image: urlFor(image).url(),
        size: selectedSize, // Add size attribute
      });
    }
    handleCartClick();
  };

  return (
    <div className="w-full md:w-auto flex flex-col">
      <div className="mb-4">
        <p>Seleziona la taglia:</p>
        <div className="mt-3 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <label
              key={size}
              className={`text-center w-full md:w-auto cursor-pointer text-white px-4 py-2 border rounded-lg transition-colors
                ${
                  selectedSize === size
                    ? "bg-primary border-primary" // Selected: full color
                    : "bg-transparent border-primary hover:bg-primary hover:text-white" // Not selected: outlined
                }`}
            >
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="hidden" // Hide the default radio button
              />
              <span className={`${selectedSize === size ? "text-white" : ""}`}>
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>
      <Button
        className="text-white w-full md:w-auto"
        onClick={handleAddToCart}
        disabled={!selectedSize}
      >
        Aggiungi al carrello
      </Button>
    </div>
  );
}
