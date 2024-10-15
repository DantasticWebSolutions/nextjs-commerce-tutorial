"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";
import SkeletonImage from "./SkeletonsImage";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };
  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {images.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg">
            <SkeletonImage
              src={urlFor(image).url()}
              alt="Foto prodotti"
              className="h-full w-full object-cover object-center cursor-pointer"
              skeletonClassName="min-w-[200px] min-h-[100px] h-full w-full"
              priority={true}
              width={200}
              height={200}
              onClick={() => handleSmallImageClick(image)}
            />
            {/* <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="photo"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            /> */}
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg lg:col-span-4">
        {/* <Image
          src={urlFor(bigImage).url()}
          alt="Photo"
          width={500}
          height={500}
          className="h-full w-full object-cover object-center"
        /> */}
        <SkeletonImage
          src={urlFor(bigImage).url()}
          alt="Foto prodotti"
          className="h-full w-full object-cover object-center"
          skeletonClassName="min-w-[250px] min-h-[300px] h-full w-full"
          priority={true}
          width={500}
          height={500}
        />

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
