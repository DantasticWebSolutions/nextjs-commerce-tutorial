import React from "react";

const SkeletonInstagramDm = () => {
  return (
    <div
      className="fixed bottom-3 right-3 md:bottom-8 md:right-6"
      aria-hidden="true"
    >
      {/* Instagram Icon Placeholder */}
      <div className="w-12 h-12 md:w-14 md:h-14 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
  );
};

export default SkeletonInstagramDm;
