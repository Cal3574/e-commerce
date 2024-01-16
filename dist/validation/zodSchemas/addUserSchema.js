"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserSchema = void 0;
const zod_1 = require("zod");
exports.addUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string().min(3).max(100),
});
