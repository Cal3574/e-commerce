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
exports.getSpecificUserOrderService = exports.getAllUserOrdersService = exports.createOrderService = void 0;
const prisma_1 = __importDefault(require("../../../config/prisma")); // Ensure you have Prisma client imported
const ApiReturn_1 = require("../../../util/ApiReturn");
const ordersRepository_1 = require("../../data-access/orders/ordersRepository");
function createOrderService(orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.default
            .$transaction((trans) => __awaiter(this, void 0, void 0, function* () {
            // Initialize the total order amount
            let total = 0;
            const orderItems = [];
            // Check if the products exist and are in stock
            for (const product of orderData.products) {
                const productId = Number(product.productId);
                const quantity = Number(product.quantity);
                // Fetch current stock level for the product using the transaction
                const currentProduct = yield trans.product.findUnique({
                    where: { id: productId },
                });
                if (!currentProduct || currentProduct.quantity < quantity) {
                    throw new Error(`Product ID ${productId} is not available in the requested quantity`);
                }
                // Calculate the actual quantity (limited by available stock)
                const actualQuantity = Math.min(quantity, currentProduct.quantity);
                // Add to total price
                total += actualQuantity * currentProduct.price;
                // Prepare order item and update available product quantity
                orderItems.push({ productId: productId, quantity: actualQuantity });
                // Update the product in the database with the new quantity
                yield trans.product.update({
                    where: { id: productId },
                    data: { quantity: currentProduct.quantity - actualQuantity },
                });
            }
            // Create the order with order items using the transaction
            const newOrder = yield trans.order.create({
                data: {
                    userId: orderData.userId,
                    total: total,
                    status: "PENDING",
                    orderItems: { create: orderItems },
                },
            });
            return newOrder;
        }))
            .then((result) => {
            return ApiReturn_1.ApiResultWithData.SuccessfulResult(result);
        })
            .catch((error) => {
            // Handle errors such as insufficient product quantity
            return ApiReturn_1.ApiResult.FailedResult([error.message]);
        });
    });
}
exports.createOrderService = createOrderService;
function getAllUserOrdersService(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userOrders = yield (0, ordersRepository_1.getAllUserOrdersRepository)(userId);
        if (userOrders.length === 0) {
            return ApiReturn_1.ApiResult.FailedResult(["No orders found for the user"]);
        }
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(userOrders);
    });
}
exports.getAllUserOrdersService = getAllUserOrdersService;
function getSpecificUserOrderService(userId, orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userOrder = yield (0, ordersRepository_1.getSpecificUserOrderRepository)(userId, orderId);
        if (!userOrder) {
            return ApiReturn_1.ApiResult.FailedResult(["No order found for the user"]);
        }
        return ApiReturn_1.ApiResultWithData.SuccessfulResult(userOrder);
    });
}
exports.getSpecificUserOrderService = getSpecificUserOrderService;
