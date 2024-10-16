import React from "react";

interface SkeletonImageProps {
  className?: string;
  skeletonClassName?: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  className,
  skeletonClassName,
}) => {
  return (
    <div
      className={`${className} ${skeletonClassName} bg-gray-200 rounded animate-pulse`}
    ></div>
  );
};

export default SkeletonImage;
