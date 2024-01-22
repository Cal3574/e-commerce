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
exports.updateCartItemRepository = exports.deleteCartItemRepository = exports.addProductToCartRepository = exports.getCartRepository = exports.createCartRepository = void 0;
const prisma_1 = __importDefault(require("../../../config/prisma"));
function createCartRepository(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCard = yield prisma_1.default.shoppingCart.create({
            data: { userId },
        });
        return newCard;
    });
}
exports.createCartRepository = createCartRepository;
function getCartRepository(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield prisma_1.default.shoppingCart.findUnique({
            where: {
                userId: userId,
            },
            include: {
                cartItems: true,
            },
        });
        return cart;
    });
}
exports.getCartRepository = getCartRepository;
function addProductToCartRepository(userId, productId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        let cart;
        cart = yield prisma_1.default.shoppingCart.findUnique({
            where: {
                userId: userId,
            },
        });
        if (!cart) {
            cart = yield prisma_1.default.shoppingCart.create({
                data: {
                    userId: userId,
                },
            });
        }
        //add cart item
        const cartItem = yield prisma_1.default.cartItems.create({
            data: {
                cartId: cart.cartId,
                productId: productId,
                quantity: quantity,
            },
        });
        if (!cartItem) {
            return null;
        }
        return cartItem;
    });
}
exports.addProductToCartRepository = addProductToCartRepository;
function deleteCartItemRepository(cartItemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartItem = yield prisma_1.default.cartItems.delete({
            where: {
                cartItemId: cartItemId,
            },
        });
        return cartItem;
    });
}
exports.deleteCartItemRepository = deleteCartItemRepository;
function updateCartItemRepository(cartItemId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartItem = yield prisma_1.default.cartItems.update({
            where: {
                cartItemId: cartItemId,
            },
            data: {
                quantity: quantity,
            },
        });
        return cartItem;
    });
}
exports.updateCartItemRepository = updateCartItemRepository;
