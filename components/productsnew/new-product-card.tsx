import React from "react";
import { Product } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Id } from "@/convex/_generated/dataModel";
import ProductCrud from "./new-product-control2";
import Image from "next/image";

interface NewProductCardProps {
  product: Product & { _id: Id<"newproduct"> };
}

const NewProductCard: React.FC<NewProductCardProps> = ({ product }) => {
  const { _id, name, price, category, isFeatured, images } = product;

  return (
    <section
      key={_id}
      className=" border rounded-lg shadow-md overflow-hidden max-w-md mx-auto mb-4"
    >
      <CardHeader className="p-4 border-b">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <p className="text-lg text-green-600 font-semibold">
          ${price.toFixed(2)}
        </p>
        <p className="text-lg bg-indigo-600/40 w-fit px-3  font-semibold">{category}</p>
        <p className="text-lg text-indigo-600/40 font-semibold">
        {isFeatured ? "Featured" : "Not Featured"  }
        </p>
      </CardHeader>
      <CardContent className="p-4">
        <div className="">
          <Carousel>
            <CarouselContent className="">
              {images.map((image, i) => (
                <CarouselItem
                  key={i}
                  className="relative max-h-64 overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={name}
                    height={400}
                    width={500}
                    className="rounded-lg border aspect-video overflow-hidden border-gray-200"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-2 transform -translate-y-1/2 rounded-full p-2 cursor-pointer" />
            <CarouselNext className="absolute top-1/2 right-2 transform -translate-y-1/2  rounded-full p-2 cursor-pointer" />
          </Carousel>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-gray-100 flex justify-between">
        <ProductCrud type="update" initialData={product} />
        <ProductCrud type="delete" initialData={product} />
      </CardFooter>
    </section>
  );
};

export default NewProductCard;
