import { z, ZodSchema } from "zod";

export const addCartSchema = z.object({
  userId: z.number(),
});

export const addProductToCartSchema = z.object({
  userId: z.number(),
  productId: z.number(),
  quantity: z.number(),
});

export const deleteCartItemSchema = z.object({
  cartItemId: z.number(),
});

export const updateCartItemSchema = z.object({
  cartItemId: z.number(),
  quantity: z.number(),
});
