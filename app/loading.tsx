import SkeletonHero from "./components/Skeletons/SkeletonHero";
import SkeletonNewest from "./components/Skeletons/SkeletonNewest";
import SkeletonInstagramDm from "./components/Skeletons/SkeletonInstagramDm";

export default function Loading() {
  return (
    <div className="pb-6 sm:pb-8 lg:pb-12">
      <SkeletonHero />
      <SkeletonNewest />
      <SkeletonInstagramDm />
    </div>
  );
}
