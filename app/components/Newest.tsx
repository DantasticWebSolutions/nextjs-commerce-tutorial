import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ProductCard from "./ProductCard";

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
      }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Newest() {
  const data: simplifiedProduct[] = await getData();

  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center items-center">
          <h2 className="w-100 text-2xl font-semibold tracking-tight">
            Merchandise firmato Brooklyn
          </h2>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-10 items-stretch justify-center">
          {data.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              categoryName={product.categoryName}
              imageUrl={product.imageUrl}
              slug={product.slug}
            />
            // <div key={product._id} className="group relative">
            //   <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
            //     <Image
            //       src={product.imageUrl}
            //       alt="Product image"
            //       className="w-full h-full object-cover object-center lg:h-full lg:w-full"
            //       width={300}
            //       height={300}
            //     />
            //   </div>

            //   <div className="mt-4 flex justify-between">
            //     <div>
            //       <h3 className="text-sm text-gray-700">
            //         <Link href={`/product/${product.slug}`}>
            //           {product.name}
            //         </Link>
            //       </h3>
            //       <p className="mt-1 text-sm text-gray-500">
            //         {product.categoryName}
            //       </p>
            //     </div>
            //     <p className="text-sm font-medium text-gray-900">
            //       €{product.price}
            //     </p>
            //   </div>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
}
