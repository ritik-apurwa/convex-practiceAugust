// products.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { newproductSchema } from "./schema";

export const getUrl = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});


 
export const generateUploadUrl = mutation({
  args: {
  },
  handler: async (ctx, args) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const createProduct = mutation({
  args: newproductSchema,
  handler: async (ctx, args) => {
    const { ...rest } = args;
    const productId = await ctx.db.insert("newproduct", {
      ...rest,
    });
    return productId;
  },
});

export const updateProduct = mutation({
  args: { id: v.id("newproduct"), ...newproductSchema },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, {
      ...updates,
    });
    return id;
  },
});

export const deleteProduct = mutation({
  args: { id: v.id("newproduct") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("newproduct").collect();
  },
});
