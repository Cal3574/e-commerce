import express, { NextFunction, Request, Response } from "express";
import { createOrderService } from "../../services/orders/ordersService";
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

module.exports = router;
