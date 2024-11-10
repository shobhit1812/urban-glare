import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-600 shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        <Skeleton className="w-full h-80" />
      </div>
      <div className="p-4">
        <Skeleton className="w-4/5 h-6 mb-2" />
        <Skeleton className="w-3/5 h-6 mt-2" />
        <Skeleton className="w-2/5 h-6 mt-2" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
