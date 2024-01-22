"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrderSchema = void 0;
const zod_1 = require("zod");
exports.addOrderSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.number(),
        quantity: zod_1.z.number(),
    })),
});
