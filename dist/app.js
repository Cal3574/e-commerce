"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./errors/errorHandler");
const rateLimit_1 = require("./lib/rateLimit");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const productRoutes = require("./layers/controllers/product/productController"); // Import your route file
const userRoutes = require("./layers/controllers/user/userController");
const orderRoutes = require("./layers/controllers/orders/ordersController");
const cartRoutes = require("./layers/controllers/cart/cartController");
const app = (0, express_1.default)();
//config cors to allow requests from frontend
app.use(cors({
    origin: "http://localhost:3000", // Replace with frontend domain
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
}));
//rate limiter
app.use("/api/", rateLimit_1.limiter);
// for parsing application/json
app.use(express_1.default.json());
app.use(cookieParser());
//individual routes
app.use("/api/product", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use(errorHandler_1.errorHandler);
module.exports = app;
