import express, { NextFunction, Request, Response } from "express";
import {
  addProductToCartService,
  createCartService,
  deleteCartItemService,
  getCartService,
  updateCartItemService,
} from "../../services/cart/cartService";
import { BaseController } from "../baseController";

const router = express.Router();

router.post(
  "/new-cart",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.body.userId);

      // Call the service function to add the cart
      const newCart = await createCartService(userId);

      BaseController.apiResultToStatusCode(res, newCart);
      res.json(newCart);
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  "/get-cart/:userId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);

      // Call the service function to get the cart
      const cart = await getCartService(userId);

      BaseController.apiResultToStatusCode(res, cart);
      res.json(cart);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  "/add-product-to-cart",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.body.userId);
      const productId = Number(req.body.productId);
      const quantity = Number(req.body.quantity);

      // Call the service function to add the cart
      const cartItem = await addProductToCartService(
        userId,
        productId,
        quantity
      );

      BaseController.apiResultToStatusCode(res, cartItem);
      res.json(cartItem);
    } catch (e) {
      next(e);
    }
  }
);

router.delete(
  "/delete-cart-item/:cartItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartItemId = Number(req.params.cartItemId);

      // Call the service function to add the cart
      const cartItem = await deleteCartItemService(cartItemId);

      BaseController.apiResultToStatusCode(res, cartItem);
      res.json(cartItem);
    } catch (e) {
      next(e);
    }
  }
);

router.put(
  "/update-cart-item/:cartItemId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cartItemId = Number(req.params.cartItemId);
      const quantity = Number(req.body.quantity);

      // Call the service function to add the cart
      const cartItem = await updateCartItemService(cartItemId, quantity);

      BaseController.apiResultToStatusCode(res, cartItem);
      res.json(cartItem);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
