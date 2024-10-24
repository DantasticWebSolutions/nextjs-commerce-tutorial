"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { simplifiedProduct } from "../../interface";

interface NewestClientProps {
  data: simplifiedProduct[];
}

export default function NewestClient({ data }: NewestClientProps) {
  return (
    <motion.div
      className="newest-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center items-center">
          <h2 className="w-100 text-2xl font-semibold tracking-tight">
            Merchandise firmato Brooklyn
          </h2>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-10 items-center justify-center">
          {data.map((product) => (
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
      </div>
    </motion.div>
  );
}
