import React from "react";

const SkeletonAddToBag = () => {
  return (
    <div className="w-full md:w-auto flex flex-col">
      {/* Size Selection Placeholder */}
      <div className="mb-4">
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mb-2"></div>
        <div className="flex flex-col space-y-4">
          {["XS", "S", "M", "L", "XL"].map((size) => (
            <div
              key={size}
              className="h-8 bg-gray-200 rounded w-full animate-pulse mb-2"
            ></div>
          ))}
        </div>
      </div>
      {/* Add to Cart Button Placeholder */}
      <div className="h-10 bg-gray-200 rounded w-full animate-pulse"></div>
    </div>
  );
};

export default SkeletonAddToBag;
