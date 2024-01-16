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
const productService_1 = require("../services/productService");
const router = express_1.default.Router();
// Route to add a new product
router.post("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract product data from the request body
        const productData = req.body;
        console.log("req.body:", req.body);
        // Call the service function to add the product
        const newProduct = yield (0, productService_1.addProductService)(productData);
        // Send a successful response with the newly created product
        res.status(201).json(newProduct);
    }
    catch (error) {
        // Handle any errors that occur during the process
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Route to get all products
router.get("/products", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productService_1.allProductsService)();
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error getting products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
// Route to delete a product by ID
router.delete("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deleted = yield (0, productService_1.deleteProductService)(id);
        res
            .status(200)
            .json({ message: `Product with ID ${id} has been deleted successfully` });
    }
    catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.put("/products/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const productData = req.body;
        const updated = yield (0, productService_1.updateProductService)(id, productData);
        res.status(200).json(updated);
    }
    catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
module.exports = router;
