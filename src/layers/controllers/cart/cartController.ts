import express, { NextFunction, Request, Response } from "express";
import {
  addProductToCartService,
  createCartService,
  deleteCartItemService,
  getCartService,
  updateCartItemService,
} from "../../services/cart/cartService";
import { BaseController } from "../baseController";
import {
  addCartSchema,
  addProductToCartSchema,
  deleteCartItemSchema,
  updateCartItemSchema,
} from "../../../schemas/zodSchemas/addCartSchema";

const router = express.Router();

router.post(
  "/new-cart",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.body.userId);

      const validatedData = addCartSchema.parse(userId);

      const newCart = await createCartService(validatedData.userId);

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

      const validatedData = addProductToCartSchema.parse({
        userId,
        productId,
        quantity,
      });

      const cartItem = await addProductToCartService(
        validatedData.userId,
        validatedData.productId,
        validatedData.quantity
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

      const validatedData = deleteCartItemSchema.parse({
        cartItemId,
      });

      const cartItem = await deleteCartItemService(validatedData.cartItemId);

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

      const validatedData = updateCartItemSchema.parse({
        cartItemId,
        quantity,
      });

      // Call the service function to add the cart
      const cartItem = await updateCartItemService(
        validatedData.cartItemId,
        validatedData.quantity
      );

      BaseController.apiResultToStatusCode(res, cartItem);
      res.json(cartItem);
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
