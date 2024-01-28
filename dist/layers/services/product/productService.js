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
exports.updateProductService = exports.deleteProductService = exports.getProductByIdService = exports.getAllProductsCategoriesService = exports.getAllProductsService = exports.addProductService = void 0;
const productRepository_1 = require("../../data-access/product/productRepository");
const ApiReturn_1 = require("../../../util/ApiReturn");
// Service function to add a product
function addProductService(productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const newProduct = yield (0, productRepository_1.addProduct)(productData);
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(newProduct);
    });
}
exports.addProductService = addProductService;
function getAllProductsService() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield (0, productRepository_1.allProducts)();
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(products);
    });
}
exports.getAllProductsService = getAllProductsService;
function getAllProductsCategoriesService() {
    return __awaiter(this, void 0, void 0, function* () {
        const products = yield (0, productRepository_1.allProductsCategories)();
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(products);
    });
}
exports.getAllProductsCategoriesService = getAllProductsCategoriesService;
function getProductByIdService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const product = yield (0, productRepository_1.getProductById)(id);
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(product);
    });
}
exports.getProductByIdService = getProductByIdService;
function deleteProductService(id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, productRepository_1.deleteProduct)(id);
        return ApiReturn_1.ApiResult.SuccessfulResult();
    });
}
exports.deleteProductService = deleteProductService;
// Type Constraints
// T extends Partial<ProductDataType>: This generic constraint means that productData can be an object with any subset of the properties defined in ProductDataType. It allows for updating one or more fields of the product without needing to provide the entire product data structure.
function updateProductService(id, productData) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedProduct = yield (0, productRepository_1.updateProduct)(id, productData);
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(updatedProduct);
    });
}
exports.updateProductService = updateProductService;
