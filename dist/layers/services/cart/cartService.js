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
exports.updateCartItemService = exports.deleteCartItemService = exports.addProductToCartService = exports.getCartService = exports.createCartService = void 0;
const ApiReturn_1 = require("../../../util/ApiReturn");
const cartRepository_1 = require("../../data-access/cart/cartRepository");
function createCartService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCart = yield (0, cartRepository_1.createCartRepository)(userId);
        if (!newCart) {
            return ApiReturn_1.ApiResultWithData.FailedResult(["Failed to create cart"]);
        }
        return ApiReturn_1.ApiResult.SuccessfulResult();
    });
}
exports.createCartService = createCartService;
function getCartService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield (0, cartRepository_1.getCartRepository)(userId);
        if (!cart) {
            return ApiReturn_1.ApiResultWithData.FailedResult(["Failed to get cart"]);
        }
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(cart);
    });
}
exports.getCartService = getCartService;
function addProductToCartService(userId, productId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartItem = yield (0, cartRepository_1.addProductToCartRepository)(userId, productId, quantity);
        if (!cartItem) {
            return ApiReturn_1.ApiResultWithData.FailedResult(["Failed to add product to cart"]);
        }
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(cartItem);
    });
}
exports.addProductToCartService = addProductToCartService;
function deleteCartItemService(cartItemId) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartItem = yield (0, cartRepository_1.deleteCartItemRepository)(cartItemId);
        if (!cartItem) {
            return ApiReturn_1.ApiResultWithData.FailedResult(["Failed to delete cart item"]);
        }
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(cartItem);
    });
}
exports.deleteCartItemService = deleteCartItemService;
function updateCartItemService(cartItemId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const cartItem = yield (0, cartRepository_1.updateCartItemRepository)(cartItemId, quantity);
        if (!cartItem) {
            return ApiReturn_1.ApiResultWithData.FailedResult(["Failed to update cart item"]);
        }
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(cartItem);
    });
}
exports.updateCartItemService = updateCartItemService;
