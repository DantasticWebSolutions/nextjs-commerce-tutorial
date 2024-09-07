// components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";

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
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link href={`/product/${slug}`}>
        <Image
          className="p-8 rounded-t-lg object-cover"
          src={imageUrl}
          alt={`${name} image`}
          height={300}
          width={300}
          style={{ width: "100%", height: "75%", maxHeight: "320px" }}
        />
      </Link>
      <div className="px-5 pb-5">
        <Link href={`/product/${slug}`}>
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            €{price}
          </span>
          <Link href={`/product/${slug}`}>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add to cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
