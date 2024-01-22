import prisma from "../../../config/prisma";

export async function createCartRepository(userId: number) {
  const newCard = await prisma.shoppingCart.create({
    data: { userId },
  });
  return newCard;
}

export async function getCartRepository(userId: number) {
  const cart = await prisma.shoppingCart.findUnique({
    where: {
      userId: userId,
    },
    include: {
      cartItems: true,
    },
  });

  return cart;
}

export async function addProductToCartRepository(
  userId: number,
  productId: number,
  quantity: number
) {
  let cart;

  cart = await prisma.shoppingCart.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!cart) {
    cart = await prisma.shoppingCart.create({
      data: {
        userId: userId,
      },
    });
  }

  //add cart item
  const cartItem = await prisma.cartItems.create({
    data: {
      cartId: cart.cartId,
      productId: productId,
      quantity: quantity,
    },
  });

  if (!cartItem) {
    return null;
  }

  return cartItem;
}

export async function deleteCartItemRepository(cartItemId: number) {
  const cartItem = await prisma.cartItems.delete({
    where: {
      cartItemId: cartItemId,
    },
  });

  return cartItem;
}

export async function updateCartItemRepository(
  cartItemId: number,
  quantity: number
) {
  const cartItem = await prisma.cartItems.update({
    where: {
      cartItemId: cartItemId,
    },
    data: {
      quantity: quantity,
    },
  });

  return cartItem;
}
