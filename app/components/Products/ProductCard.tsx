// components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SkeletonImage from "../Skeletons/SkeletonsImage";
import { lazy } from "react";

// Define the interface for the product
interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  slug: string;
}

export default function ProductCard({
  id,
  name,
  price,
  category,
  imageUrl,
  slug,
}: ProductCardProps) {
  return (
    <div className="relative w-full max-w-sm border border-border rounded-lg shadow-custom-light">
      <Link href={`/product/${slug}`}>
        <SkeletonImage
          src={imageUrl}
          alt={name}
          className="h-full w-full object-cover object-center"
          imageClassName="pb-8 rounded-t-lg"
          skeletonClassName="min-w-[250px] min-h-[300px] h-full w-full md:min-w-[350px] md:min-h-[350px]"
          priority={true}
          width={300}
          height={300}
          style={{ width: "100%", height: "75%", maxHeight: "320px" }}
        />
        {category === "Edizione speciale" && (
          <span className="absolute left-0 top-0 rounded-tl-lg rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
            Edizione Limitata
          </span>
        )}
        {/* 
        <Image
          className="pb-8 rounded-t-lg object-cover"
          src={imageUrl}
          alt={`${name} image`}
          height={300}
          width={300}
          style={{ width: "100%", height: "75%", maxHeight: "320px" }}
        /> */}
      </Link>
      <div className="px-5 pb-5">
        <div className="flex items-center justify-between mt-3">
          <Link href={`/product/${slug}`}>
            <h3 className="text-xl font-normal tracking-tight">{name}</h3>
          </Link>
          <span className="text-3xl font-bold ps-3">
            €{(price / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3 w-full">
          <Link href={`/product/${slug}`} className="w-full">
            <Button className="text-white w-full focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Scopri
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
