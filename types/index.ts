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

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export const UserZodSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address"),
  image: z.string().url("Invalid image URL"),

  isAdmin: z.boolean().optional(),
  passCode: z.number().optional(),
});

export type User = z.infer<typeof UserZodSchema> & {
  _id?: Id<"users">;  // Adjust the Id type according to your model
  _creationTime: Date;
};