import express, { Express } from "express";
import { errorHandler } from "./errors/errorHandler";
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const productRoutes = require("./layers/controllers/product/productController"); // Import your route file
const userRoutes = require("./layers/controllers/user/userController");
const orderRoutes = require("./layers/controllers/orders/ordersController");
const cartRoutes = require("./layers/controllers/cart/cartController");
const app: Express = express();

//config cors to allow requests from frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with frontend domain
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true,
  })
);

// for parsing application/json
app.use(express.json());
app.use(cookieParser());

//individual routes
app.use("/api/product", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.use(errorHandler);

module.exports = app;
