"use client";
import React from "react";
import AddToBag from "@/app/components/Products/AddToBag";
import ImageGallery from "@/app/components/Products/ImageGallery";
import { fullProduct, simplifiedProduct } from "@/app/interface";
import { Truck } from "lucide-react";
import InstagramDm from "@/app/components/InstagramDm";
import { motion } from "framer-motion";
import ProductCard from "@/app/components/Products/ProductCard";
import Link from "next/link";

interface ProductPageClientProps {
  data: fullProduct;
  recommendedProducts: simplifiedProduct[];
}

export default function ProductPageClient({
  data,
  recommendedProducts,
}: ProductPageClientProps) {
  return (
    <div>
      <motion.div
        className="mx-auto max-w-screen-xl px-4 md:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <Link
          href="/"
          className="inline-flex items-center border border-primary px-3 py-1.5 rounded-md text-primary mb-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            ></path>
          </svg>
          <span className="ml-1 font-bold text-lg ">Indietro</span>
        </Link>
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery category={data.categoryName} images={data.images} />

          <div className="md:py-8">
            <div className="mb-6">
              <div className="flex items-end gap-2">
                <h3 className="text-4xl md:text-5xl">
                  €{(data.price / 100).toFixed(2)}
                </h3>
              </div>
            </div>
            <div className="mb-2 md:mb-3">
              {/* <span className="mb-0.5 inline-block">{data.categoryName}</span> */}
              <h1 className="text-2xl font-bold lg:text-3xl">{data.name}</h1>
            </div>

            <p className="mb-12 text-sm font-thin tracking-wide">
              {data.description}
            </p>

            <div className="flex gap-2.5">
              <AddToBag
                currency="EUR"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
                category={data.categoryName}
              />
            </div>
            <div className="mt-3 mb-6 flex items-center gap-2">
              <Truck className="w-6 h-6" />
              <span className="text-sm">
                Spedizione in 3-6 Giorni lavorativi
              </span>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Recommended Products Section */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
      >
        <div className="flex justify-center items-center">
          <h2 className="w-100 text-2xl font-semibold tracking-tight">
            Merchandise firmato Brooklyn
          </h2>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-10 items-center justify-center">
          {recommendedProducts.map((product: any) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              category={product.categoryName}
              imageUrl={product.imageUrl}
              slug={product.slug}
            />
          ))}
        </div>
      </motion.div>
      <InstagramDm />
    </div>
  );
}
