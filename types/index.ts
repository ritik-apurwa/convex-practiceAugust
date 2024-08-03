import { Id } from "@/convex/_generated/dataModel";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const phoneNumberSchema = z
  .string()
  .refine((value) => isValidPhoneNumber(value, "IN"), {
    message: "Invalid phone number",
  });

export const ProductZodSchemaNew = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be non-negative"),
  images: z.array(z.string()),
  category: z.string().min(1),
  isFeatured: z.boolean(),
  phoneNumber: phoneNumberSchema,
});

export type Product = z.infer<typeof ProductZodSchemaNew> & {
  _id: Id<"newproduct">;
  _creationTime: number;
};

export type ProductFormDataNew = z.infer<typeof ProductZodSchemaNew>;

export interface ProductInterface extends ProductFormDataNew {
  _id: Id<"newproduct">;
}
