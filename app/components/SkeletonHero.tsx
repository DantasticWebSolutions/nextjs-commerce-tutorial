import React from "react";

export default function SkeletonHero() {
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <div className="mb-4 h-12 w-3/4 animate-pulse bg-gray-200 rounded"></div>
          <div className="mb-4 h-6 w-2/3 animate-pulse bg-gray-200 rounded"></div>
          <div className="h-4 w-full animate-pulse bg-gray-200 rounded"></div>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg shadow-lg md:left-16 md:top-16 lg:ml-0">
            <div className="min-w-[250px] min-h-[250px] md:min-w-[350px] md:min-h-[350px] animate-pulse bg-gray-200 rounded-lg"></div>
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg min-w-[250px] min-h-[250px] md:min-w-[350px] md:min-h-[350px] animate-pulse bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
}
