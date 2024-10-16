// app/home/components/SkeletonNewest.tsx

import React from "react";

const SkeletonNewest = () => {
  // Define the number of skeleton product cards to display
  const skeletonCards = Array.from({ length: 4 }); // Adjust the length as needed

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      {/* Header Placeholder */}
      <div className="flex justify-center items-center mb-8">
        <div className="h-6 w-64 bg-gray-200 rounded"></div>
      </div>

      {/* Products Grid */}
      <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-10 items-center justify-center">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="w-full max-w-sm border border-gray-200 rounded-lg shadow-lg p-4"
          >
            {/* Image Placeholder */}
            <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4"></div>
            {/* Title Placeholder */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            {/* Price Placeholder */}
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            {/* Button Placeholder */}
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonNewest;
