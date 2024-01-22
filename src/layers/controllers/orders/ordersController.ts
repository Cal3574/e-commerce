import express, { NextFunction, Request, Response } from "express";
import {
  createOrderService,
  getAllUserOrdersService,
  getSpecificUserOrderService,
} from "../../services/orders/ordersService";
import { BaseController } from "../baseController";

const router = express.Router();

router.post(
  "/new-order",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData = req.body;

      //zod schema validation
      // Call the service function to add the order
      const newOrder = await createOrderService(orderData);

      BaseController.apiResultToStatusCode(res, newOrder);
      res.json(newOrder);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/all-orders/:userId",

  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);

      // Call the service function to get all orders
      const orders = await getAllUserOrdersService(userId);
      console.log(orders);

      BaseController.apiResultToStatusCode(res, orders);
      res.json(orders);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/order/:userId/:orderId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const orderId = Number(req.params.orderId);

      // Call the service function to get the order
      const order = await getSpecificUserOrderService(userId, orderId);

      BaseController.apiResultToStatusCode(res, order);
      res.json(order);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
