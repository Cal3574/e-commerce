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
exports.createOrderService = void 0;
const ApiReturn_1 = require("../../../return/ApiReturn");
const ordersRepository_1 = require("../../data-access/orders/ordersRepository");
const productRepository_1 = require("../../data-access/product/productRepository");
const productService_1 = require("../product/productService");
function createOrderService(orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        //destructure the product ids
        console.log(orderData, "orderData");
        const productIds = orderData.products.map((product) => {
            const order = {
                productId: Number(product.productId),
                quantity: Number(product.quantity),
            };
            return order;
        });
        console.log(productIds, "productIds");
        //check if the products exist and are in stock
        let availableProducts = [];
        for (let i = 0; i < productIds.length; i++) {
            const product = yield (0, productRepository_1.getProductById)(productIds[i].productId);
            if (product && product.quantity > 0) {
                availableProducts.push(Object.assign({}, product));
            }
        }
        if (availableProducts.length === 0) {
            return ApiReturn_1.ApiResult.FailedResult(["The selected products are not available"]);
        }
        //check if we have enough stock for the user to buy the requested quantity
        for (let i = 0; i < availableProducts.length; i++) {
            const product = availableProducts[i];
            const requestedQuantity = productIds.find((p) => p.productId === product.id).quantity;
            if (requestedQuantity > product.quantity) {
                return ApiReturn_1.ApiResult.FailedResult([
                    `Only ${product.quantity} of ${product.name} are available`,
                ]);
            }
        }
        //calculate the total
        const total = availableProducts.reduce((acc, product) => {
            return acc + product.price * product.quantity;
        }, 0);
        const formattedOrder = {
            userId: 27,
            total: total,
            status: "PENDING",
            products: {
                connect: availableProducts.map((product) => {
                    return { id: product.id };
                }),
            },
        };
        //create the order
        const newOrder = yield (0, ordersRepository_1.createOrderRepository)(formattedOrder);
        //update the product quantities
        const productUpdates = availableProducts.map((product) => {
            return {
                id: product.id,
                quantity: product.quantity -
                    productIds.find((p) => p.productId === product.id).quantity,
            };
        });
        yield Promise.allSettled(productUpdates.map((product) => {
            return (0, productService_1.updateProductService)(product.id, product);
        }));
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(newOrder);
    });
}
exports.createOrderService = createOrderService;
