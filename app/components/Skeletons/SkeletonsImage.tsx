"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import Skeleton from "./SkeletonGlobal"; // Assuming you have a Skeleton component

interface SkeletonImageProps extends ImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  skeletonClassName?: string;
  imageClassName?: string;
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({
  src,
  alt,
  className,
  priority,
  skeletonClassName,
  imageClassName,
  ...rest
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative ${className}`}>
      {/* <Skeleton className={`${skeletonClassName}`} /> */}
      {/* {isLoading && <Skeleton className={`${skeletonClassName}`} />} */}
      <Image
        src={src}
        alt={alt}
        className={`${imageClassName} h-full w-full object-cover object-center`}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        {...rest}
      />
    </div>
  );
};

export default SkeletonImage;
