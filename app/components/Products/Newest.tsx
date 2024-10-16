import { simplifiedProduct } from "../../interface";
import { client } from "../../lib/sanity";
import NewestClient from "./NewestClient";

async function getData(): Promise<simplifiedProduct[]> {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url
      }`;

  try {
    const data = await client.fetch(query);
    if (!data) {
      throw new Error("No data found for 'newest'");
    }
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    throw error;
  }
}

export default async function Newest() {
  const data = await getData();

  return <NewestClient data={data} />;
}
