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
const express_1 = __importDefault(require("express"));
const baseController_1 = require("../baseController");
const tokenValidationMiddleware_1 = require("../../../validation/tokenValidationMiddleware");
const addProductSchema_1 = require("../../../schemas/zodSchemas/addProductSchema");
const productService_1 = require("../../services/product/productService");
const router = express_1.default.Router();
// Route to add a new product
router.post("/new-product", tokenValidationMiddleware_1.validateTokenMiddleware, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Extract product data from the request body
        const productData = req.body;
        console.log(productData);
        // Extract user ID from the request
        const userId = { userId: Number((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id) };
        console.log(userId);
        //convert price & quantity to number
        productData.price = Number(productData.price);
        productData.quantity = Number(productData.quantity);
        productData.categoryId = Number(productData.categoryId);
        // Validate the product data using the schema
        const validatedData = addProductSchema_1.addProductSchema.parse(productData);
        console.log(validatedData);
        // Call the service function to add the product
        const newProduct = yield (0, productService_1.addProductService)(Object.assign(Object.assign({}, userId), validatedData));
        baseController_1.BaseController.apiResultToStatusCode(res, newProduct);
        return res.json(newProduct);
    }
    catch (e) {
        next(e);
    }
}));
// Route to get all products
router.get("/all-products", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productService_1.getAllProductsService)();
        baseController_1.BaseController.apiResultToStatusCode(res, products);
        res.json(products);
    }
    catch (e) {
        next(e);
    }
}));
// Route to get all products categories
router.get("/all-product-categories", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productService_1.getAllProductsCategoriesService)();
        baseController_1.BaseController.apiResultToStatusCode(res, products);
        res.json(products);
    }
    catch (e) {
        next(e);
    }
}));
// Route to delete a product by ID
router.delete("/delete-product/:product_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.product_id);
        const validatedData = addProductSchema_1.deleteProductSchema.parse({ product_id: id });
        const deleted = yield (0, productService_1.deleteProductService)(validatedData.product_id);
        baseController_1.BaseController.apiResultToStatusCode(res, deleted);
        res.json(deleted);
    }
    catch (e) {
        next(e);
    }
}));
router.put("/update-product/:product_id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const productData = req.body;
        const updated = yield (0, productService_1.updateProductService)(id, productData);
        baseController_1.BaseController.apiResultToStatusCode(res, updated);
        res.json(updated);
    }
    catch (e) {
        next(e);
    }
}));
module.exports = router;
