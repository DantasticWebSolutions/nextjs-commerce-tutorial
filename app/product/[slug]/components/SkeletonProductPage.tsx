// app/product/[slug]/components/SkeletonProductPage.tsx

import React from "react";
import SkeletonImage from "./SkeletonsImage"; // Adjust the path as necessary
import SkeletonAddToBag from "./SkeletonAddToBag";
import SkeletonProductCard from "./SkeletonProductCard";
import SkeletonInstagramDm from "./SkeletonInstagramDm";

const SkeletonProductPage = () => {
  return (
    <div>
      {/* Product Details Section */}
      <section
        className="mx-auto max-w-screen-xl px-4 md:px-8"
        aria-hidden="true"
      >
        <div className="grid gap-8 md:grid-cols-2">
          {/* Image Gallery Placeholder */}
          <div className="grid gap-4 lg:grid-cols-5">
            <div className="order-last flex gap-4 lg:order-none lg:flex-col">
              {/* Small Image Placeholders */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-lg">
                  <SkeletonImage
                    className="h-full w-full object-cover object-center cursor-pointer"
                    skeletonClassName="min-w-[200px] min-h-[100px] h-full w-full"
                  />
                </div>
              ))}
            </div>

            {/* Large Image Placeholder */}
            <div className="relative overflow-hidden rounded-lg lg:col-span-4">
              <SkeletonImage
                className="h-full w-full object-cover object-center"
                skeletonClassName="min-w-[250px] min-h-[300px] h-full w-full"
              />
              <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
                Sale
              </span>
            </div>
          </div>

          {/* Product Details Placeholders */}
          <div className="md:py-8">
            {/* Price Placeholder */}
            <div className="mb-6">
              <div className="flex items-end gap-2">
                <div className="h-12 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Name Placeholder */}
            <div className="mb-2 md:mb-3">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>

            {/* Description Placeholder */}
            <div className="mb-12">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse mt-2"></div>
            </div>

            {/* AddToBag Placeholder */}
            <div className="flex gap-2.5">
              <SkeletonAddToBag />
            </div>

            {/* Truck Info Placeholder */}
            <div className="mt-3 mb-6 flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Section */}
      <section
        className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8"
        aria-hidden="true"
      >
        <div className="flex justify-center items-center mb-8">
          <div className="h-6 w-64 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-10 items-center justify-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonProductCard key={index} />
          ))}
        </div>
      </section>

      {/* Instagram DM Placeholder */}
      <SkeletonInstagramDm />
    </div>
  );
};

export default SkeletonProductPage;
