"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductSchema = void 0;
const zod_1 = require("zod");
exports.addProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).max(255),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().positive(),
});
