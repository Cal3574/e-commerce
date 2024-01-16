"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.getProductById = exports.allProducts = exports.addProduct = void 0;
const prisma_1 = __importDefault(require("../../../config/prisma"));
// Function to add a product
function addProduct(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        // Use Prisma's create method to add a new product to the database
        const newProduct = yield prisma_1.default.product.create({
            data: productData,
        });
        return newProduct;
    });
}
exports.addProduct = addProduct;
// Function to get all products
function allProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield prisma_1.default.product.findMany();
        return products;
    });
}
exports.allProducts = allProducts;
// Function to get a product by ID
function getProductById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield prisma_1.default.product.findUnique({
            where: {
                id: id,
            },
        });
        return product;
    });
}
exports.getProductById = getProductById;
// Function to delete a product by ID
function deleteProduct(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleted = yield prisma_1.default.product.delete({
            where: {
                id: id,
            },
        });
        return deleted;
    });
}
exports.deleteProduct = deleteProduct;
// Function to update a product by ID
function updateProduct(id, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const updated = yield prisma_1.default.product.update({
            where: {
                id: id,
            },
            data: productData,
        });
        return updated;
    });
}
exports.updateProduct = updateProduct;
