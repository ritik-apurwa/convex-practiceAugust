"use client";
import ProductsPage from "@/components/productsnew/new-products-page";
import { api } from "@/convex/_generated/api";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React from "react";

const page = () => {
  const products = useQuery(api.newproduct.getAll);

  if (!products) return <div>Loading...</div>;
  return (
    <div>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>

      <ProductsPage />
    </div>
  );
};

export default page;
