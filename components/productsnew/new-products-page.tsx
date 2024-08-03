"use client"

import React from "react";
import BlogControlNew from "./new-product-control2";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import NewProductCard from "./new-product-card";
import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <section className=" border  rounded-lg shadow-md overflow-hidden w-full mx-auto mb-4">
      <div className="p-4 border-b">
        <Skeleton className="h-8 w-3/4 mb-2" /> {/* Name */}
        <Skeleton className="h-6 w-1/4" /> {/* Price */}
      </div>
      <div className="p-4 relative h-64">
        <Skeleton className="w-full h-full" /> {/* Image */}
      </div>
      <div className="p-4 bg-gray-100 flex justify-between">
        <Skeleton className="h-8 w-1/3" /> {/* Update Button */}
        <Skeleton className="h-8 w-1/3" /> {/* Delete Button */}
      </div>
    </section>
  );
};

const ProductsPage: React.FC = () => {
  const products = useQuery(api.newproduct.getAll);

  if (!products)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Products</h1>
          <BlogControlNew type="create" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <BlogControlNew type="create" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <NewProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
