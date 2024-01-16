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
const router = express_1.default.Router();
router.post("/new-order", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        //zod schema validation
        // Call the service function to add the order
        const newOrder = yield (0, ordersService_1.createOrderService)(orderData);
        baseController_1.BaseController.apiResultToStatusCode(res, newOrder);
        res.json(newOrder);
    }
    catch (e) {
        next(e);
    }
}));
module.exports = router;
