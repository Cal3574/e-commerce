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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductService = exports.deleteProductService = exports.allProductsService = exports.addProductService = void 0;
const productRepository_1 = require("../data-access/productRepository");
// Service function to add a product
function addProductService(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Add your business logic or validation here (if needed)
            // Use the data access function to add a new product to the database
            const newProduct = yield (0, productRepository_1.addProduct)(productData); // Call the data access function
            return newProduct;
        }
        catch (error) {
            // Handle any errors that occur during the database operation
            console.error("Error adding product:", error);
            throw error;
        }
    });
}
exports.addProductService = addProductService;
// Server to return all products
function allProductsService() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield (0, productRepository_1.allProducts)();
            return products;
        }
        catch (error) {
            console.error("Error getting products:", error);
            throw error;
        }
    });
}
exports.allProductsService = allProductsService;
function deleteProductService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deleted = yield (0, productRepository_1.deleteProduct)(id);
            return deleted;
        }
        catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    });
}
exports.deleteProductService = deleteProductService;
function updateProductService(id, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updated = yield (0, productRepository_1.updateProduct)(id, productData);
            return updated;
        }
        catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    });
}
exports.updateProductService = updateProductService;
