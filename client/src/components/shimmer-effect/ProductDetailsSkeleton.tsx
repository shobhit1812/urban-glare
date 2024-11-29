const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="p-4 md:p-8 lg:p-12 max-w-screen-xl mx-auto animate-pulse">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section: Image Skeleton */}
        <div className="flex-1 max-w-screen-lg lg:max-w-lg mx-auto">
          <div className="w-full h-96 md:h-[28rem] lg:h-[32rem] bg-gray-500 rounded-lg shadow-md"></div>
        </div>

        {/* Right Section: Details Skeleton */}
        <div className="flex-1 px-4 lg:px-8 space-y-4">
          {/* Title and Favorite Icon Skeleton */}
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2">
              <div className="h-8 bg-gray-400 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
          </div>

          {/* Price Skeleton */}
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>

          {/* Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-400 rounded w-full"></div>
            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
          </div>

          {/* Sizes Skeleton */}
          <div className="flex gap-2 mt-4 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <span
                key={i}
                className="block h-8 w-12 bg-gray-200 rounded-lg"
              ></span>
            ))}
          </div>

          {/* Button Skeleton */}
          <div className="w-2/3 py-3 bg-gray-300 rounded-lg"></div>
          <div className="w-1/3 py-3 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
