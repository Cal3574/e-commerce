import { ApiResult, ApiResultWithData } from "../../../return/ApiReturn";
import {
  addProductToCartRepository,
  createCartRepository,
  deleteCartItemRepository,
  getCartRepository,
  updateCartItemRepository,
} from "../../data-access/cart/cartRepository";

export async function createCartService(userId: number) {
  const newCart = await createCartRepository(userId);

  if (!newCart) {
    return ApiResultWithData.FailedResult(["Failed to create cart"]);
  }

  return ApiResult.SuccessfulResult();
}

export async function getCartService(userId: number) {
  const cart = await getCartRepository(userId);

  if (!cart) {
    return ApiResultWithData.FailedResult(["Failed to get cart"]);
  }

  return ApiResultWithData.SuccessfulResult(cart);
}

export async function addProductToCartService(
  userId: number,
  productId: number,
  quantity: number
) {
  const cartItem = await addProductToCartRepository(
    userId,
    productId,
    quantity
  );

  if (!cartItem) {
    return ApiResultWithData.FailedResult(["Failed to add product to cart"]);
  }

  return ApiResultWithData.SuccessfulResult(cartItem);
}

export async function deleteCartItemService(cartItemId: number) {
  const cartItem = await deleteCartItemRepository(cartItemId);

  if (!cartItem) {
    return ApiResultWithData.FailedResult(["Failed to delete cart item"]);
  }

  return ApiResultWithData.SuccessfulResult(cartItem);
}

export async function updateCartItemService(
  cartItemId: number,
  quantity: number
) {
  const cartItem = await updateCartItemRepository(cartItemId, quantity);

  if (!cartItem) {
    return ApiResultWithData.FailedResult(["Failed to update cart item"]);
  }

  return ApiResultWithData.SuccessfulResult(cartItem);
}
