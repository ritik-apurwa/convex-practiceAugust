import React from "react";
import { Product } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Id } from "@/convex/_generated/dataModel";
import ProductCrud from "./new-product-control2";
import Image from "next/image";

interface NewProductCardProps {
  product: Product & { _id: Id<"newproduct"> };
}

const NewProductCard: React.FC<NewProductCardProps> = ({ product }) => {
  const { _id, name, price, images,  } = product;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{price}</p>
        {images.map((image, i)=>(
          <Image key={i} src={image} alt={name} height={200} width={200} />
        ))}
      </CardContent>
      <CardFooter className="flex justify-between">
        <ProductCrud type="update" initialData={product} />
        <ProductCrud type="delete" initialData={product} />
      </CardFooter>
    </Card>
  );
};

export default NewProductCard;
