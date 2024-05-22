// components/SkeletonLoader.jsx
import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      <div className="w-full h-40 bg-gray-600 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-600 rounded w-1/2"></div>
    </div>
  );
};

export default SkeletonLoader;
