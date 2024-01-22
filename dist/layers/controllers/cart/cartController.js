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
const cartService_1 = require("../../services/cart/cartService");
const baseController_1 = require("../baseController");
const router = express_1.default.Router();
router.post("/new-cart", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.body.userId);
        // Call the service function to add the cart
        const newCart = yield (0, cartService_1.createCartService)(userId);
        baseController_1.BaseController.apiResultToStatusCode(res, newCart);
        res.json(newCart);
    }
    catch (e) {
        next(e);
    }
}));
router.get("/get-cart/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        // Call the service function to get the cart
        const cart = yield (0, cartService_1.getCartService)(userId);
        baseController_1.BaseController.apiResultToStatusCode(res, cart);
        res.json(cart);
    }
    catch (e) {
        next(e);
    }
}));
router.post("/add-product-to-cart", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.body.userId);
        const productId = Number(req.body.productId);
        const quantity = Number(req.body.quantity);
        // Call the service function to add the cart
        const cartItem = yield (0, cartService_1.addProductToCartService)(userId, productId, quantity);
        baseController_1.BaseController.apiResultToStatusCode(res, cartItem);
        res.json(cartItem);
    }
    catch (e) {
        next(e);
    }
}));
router.delete("/delete-cart-item/:cartItemId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItemId = Number(req.params.cartItemId);
        // Call the service function to add the cart
        const cartItem = yield (0, cartService_1.deleteCartItemService)(cartItemId);
        baseController_1.BaseController.apiResultToStatusCode(res, cartItem);
        res.json(cartItem);
    }
    catch (e) {
        next(e);
    }
}));
router.put("/update-cart-item/:cartItemId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartItemId = Number(req.params.cartItemId);
        const quantity = Number(req.body.quantity);
        // Call the service function to add the cart
        const cartItem = yield (0, cartService_1.updateCartItemService)(cartItemId, quantity);
        baseController_1.BaseController.apiResultToStatusCode(res, cartItem);
        res.json(cartItem);
    }
    catch (e) {
        next(e);
    }
}));
module.exports = router;
