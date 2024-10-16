import { client } from "../../lib/sanity";
import HeroClient from "./HeroClient";

interface HeroData {
  title: string;
  description: string;
  image1: any;
  image2: any;
}

async function getData(): Promise<HeroData> {
  const query = "*[_type == 'heroImage'][0]";
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    throw error;
  }
}
export default async function Hero() {
  const data = await getData();

  if (!data) return null;
  return <HeroClient data={data} />;
}
