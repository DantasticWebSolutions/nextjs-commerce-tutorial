"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

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
    <>
      <select
        onChange={(e) => setSelectedSize(e.target.value)}
        value={selectedSize}
      >
        <option value="">Select Size</option>
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
        <option value="XL">Extra Large</option>
      </select>
      <Button onClick={handleAddToCart} disabled={!selectedSize}>
        Add To Cart
      </Button>
    </>
  );
}
