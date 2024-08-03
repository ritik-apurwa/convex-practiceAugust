import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";

export const ProductZodSchemaNew = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be non-negative"),
  images: z.array(z.string()),
  imageStorageIds: z.array(z.string()),
});

export type Product = z.infer<typeof ProductZodSchemaNew> & {
  _id: Id<"newproduct">;
  _creationTime: number;
};

export type ProductFormDataNew = z.infer<typeof ProductZodSchemaNew>;

export interface ProductInterface extends ProductFormDataNew {
  _id: Id<"newproduct">;
}