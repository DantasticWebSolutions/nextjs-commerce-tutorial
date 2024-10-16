import { fullProduct, simplifiedProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import ProductPageClient from "./ProductPageClient";

async function getData(slug: string): Promise<fullProduct> {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
          _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
      }`;
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    throw error;
  }
}

// Fetch all products excluding the current one (recommended products)
async function getRecommendedProducts(
  slug: string
): Promise<simplifiedProduct[]> {
  const query = `*[_type == "product" && slug.current != "${slug}"] {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
      }`;
  try {
    const recommendedProducts = await client.fetch(query);
    return recommendedProducts;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    throw error;
  }
}

export const dynamic = "force-dynamic";

export default async function ProductPge({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);
  const recommendedProducts: simplifiedProduct[] = await getRecommendedProducts(
    params.slug
  );
  if (!data) return null;
  if (!recommendedProducts) return null;
  return (
    <ProductPageClient data={data} recommendedProducts={recommendedProducts} />
  );
}
