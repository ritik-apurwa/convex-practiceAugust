// schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const newproductSchema = {
  name: v.string(),
  price: v.number(),
  images: v.array(v.string()),
  category: v.string(),
  isFeatured: v.boolean(),
  phoneNumber: v.string(),
};

export default defineSchema({
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.string(),
    tokenIdentifier: v.string(),
    isOnline: v.boolean(),
    isAdmin: v.optional(v.boolean()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
  newproduct: defineTable(newproductSchema),
});
