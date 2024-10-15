"use client";
import { client, urlFor } from "../lib/sanity";
import SkeletonImage from "./SkeletonsImage";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";

  const data = await client.fetch(query);

  return data;
}

export default async function Hero() {
  const data = await getData();
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold sm:text-5xl md:mb-8 md:text-6xl">
            {data.title}
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            {data.description}
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg shadow-lg md:left-16 md:top-16 lg:ml-0">
            <SkeletonImage
              src={urlFor(data.image1).url()}
              alt="Nuovo evento"
              className="h-full w-full object-cover object-center"
              skeletonClassName="min-w-[250px] min-h-[250px] h-full w-full md:min-w-[350px] md:min-h-[350px]"
              priority={true}
              width={500}
              height={500}
            />
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg min-w-250 min-h-250">
            <SkeletonImage
              src={urlFor(data.image2).url()}
              alt="Le ultime magliette"
              className="h-full w-full object-cover object-center"
              skeletonClassName="min-w-[250px] min-h-[250px] md:min-w-[350px] md:min-h-[350px] h-full w-full"
              priority={true}
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
