import AddToBag from "@/app/components/AddToBag";
import ImageGallery from "@/app/components/ImageGallery";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import ProductCard from "@/app/components/ProductCard";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
          _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
      }`;

  const data = await client.fetch(query);

  return data;
}

// Fetch all products excluding the current one (recommended products)
async function getRecommendedProducts(slug: string) {
  const query = `*[_type == "product" && slug.current != "${slug}"] {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
      }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPge({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);
  const recommendedProducts = await getRecommendedProducts(params.slug);

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />

          <div className="md:py-8">
            <div className="mb-6">
              <div className="flex items-end gap-2">
                <h3 className="text-4xl md:text-5xl">
                  €{data.price.toFixed(2)}
                </h3>
              </div>
            </div>
            <div className="mb-2 md:mb-3">
              {/* <span className="mb-0.5 inline-block">{data.categoryName}</span> */}
              <h2 className="text-2xl font-bold lg:text-3xl">{data.name}</h2>
            </div>

            <p className="mb-12 text-sm font-thin tracking-wide">
              {data.description}
            </p>

            <div className="flex gap-2.5">
              <AddToBag
                currency="EUR"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                key={data._id}
              />
            </div>
            <div className="mt-3 mb-6 flex items-center gap-2">
              <Truck className="w-6 h-6" />
              <span className="text-sm">
                Spedizione in 3-6 Giorni lavorativi
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Recommended Products Section */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-center items-center">
          <h2 className="w-100 text-2xl font-semibold tracking-tight">
            Altri capi firmati Brooklyn
          </h2>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-10 items-stretch justify-center">
          {recommendedProducts.map((product: any) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              categoryName={product.categoryName}
              imageUrl={product.imageUrl}
              slug={product.slug}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
