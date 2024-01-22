"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItemSchema = exports.deleteCartItemSchema = exports.addProductToCartSchema = exports.addCartSchema = void 0;
const zod_1 = require("zod");
exports.addCartSchema = zod_1.z.object({
    userId: zod_1.z.number(),
});
exports.addProductToCartSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    productId: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
exports.deleteCartItemSchema = zod_1.z.object({
    cartItemId: zod_1.z.number(),
});
exports.updateCartItemSchema = zod_1.z.object({
    cartItemId: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
