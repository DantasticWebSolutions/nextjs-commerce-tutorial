import Hero from "./components/Hero/Hero";
import Newest from "./components/Products/Newest";
import InstagramDm from "./components/InstagramDm";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="pb-6 sm:pb-8 lg:pb-12">
      <Hero />
      <Newest />
      <InstagramDm />
    </div>
  );
}
