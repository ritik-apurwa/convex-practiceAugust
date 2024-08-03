"use client";

import React from "react";
import BlogControlNew from "./new-product-control2";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import NewProductCard from "./new-product-card";

const ProductsPage: React.FC = () => {
  const products = useQuery(api.newproduct.getAll);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <BlogControlNew type="create" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products?.map((product, i) => (
          <NewProductCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
