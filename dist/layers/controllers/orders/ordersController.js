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
const ordersService_1 = require("../../services/orders/ordersService");
const baseController_1 = require("../baseController");
const addOrderSchema_1 = require("../../../schemas/zodSchemas/addOrderSchema");
const router = express_1.default.Router();
router.post("/new-order", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const validatedData = addOrderSchema_1.addOrderSchema.parse(orderData);
        const newOrder = yield (0, ordersService_1.createOrderService)(validatedData);
        baseController_1.BaseController.apiResultToStatusCode(res, newOrder);
        res.json(newOrder);
    }
    catch (e) {
        next(e);
    }
}));
router.get("/all-orders/:userId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        // Call the service function to get all orders
        const orders = yield (0, ordersService_1.getAllUserOrdersService)(userId);
        baseController_1.BaseController.apiResultToStatusCode(res, orders);
        res.json(orders);
    }
    catch (e) {
        next(e);
    }
}));
router.get("/order/:userId/:orderId", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.params.userId);
        const orderId = Number(req.params.orderId);
        // Call the service function to get the order
        const order = yield (0, ordersService_1.getSpecificUserOrderService)(userId, orderId);
        baseController_1.BaseController.apiResultToStatusCode(res, order);
        res.json(order);
    }
    catch (e) {
        next(e);
    }
}));
module.exports = router;
