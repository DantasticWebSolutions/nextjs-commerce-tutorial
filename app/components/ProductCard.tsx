// components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Define the interface for the product
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  categoryName: string;
  imageUrl: string;
  slug: string;
}

export default function ProductCard({
  id,
  name,
  price,
  categoryName,
  imageUrl,
  slug,
}: ProductCardProps) {
  return (
    <div className="w-full max-w-sm border border-border rounded-lg shadow-custom-light dark:shadow-custom-dark">
      <Link href={`/product/${slug}`}>
        <Image
          className="pb-8 rounded-t-lg object-cover"
          src={imageUrl}
          alt={`${name} image`}
          height={300}
          width={300}
          style={{ width: "100%", height: "75%", maxHeight: "320px" }}
        />
      </Link>
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between mt-3">
          <Link href={`/product/${slug}`}>
            <h5 className="text-xl font-normal tracking-tight">{name}</h5>
          </Link>
          <span className="text-3xl font-bold ps-3">€{price.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between mt-3 w-full">
          <Link href={`/product/${slug}`} className="w-full">
            <Button className="w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Compra ora
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
