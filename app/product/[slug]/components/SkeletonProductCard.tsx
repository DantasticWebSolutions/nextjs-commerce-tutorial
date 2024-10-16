import React from "react";

const SkeletonProductCard = () => {
  return (
    <div
      className="w-full max-w-sm border border-gray-200 rounded-lg shadow-lg p-4"
      aria-hidden="true"
    >
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4 animate-pulse"></div>
      {/* Title Placeholder */}
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
      {/* Price Placeholder */}
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
      {/* Buy Now Button Placeholder */}
      <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
    </div>
  );
};

export default SkeletonProductCard;
