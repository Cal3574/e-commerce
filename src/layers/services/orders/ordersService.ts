import prisma from "../../../config/prisma"; // Ensure you have Prisma client imported
import { ApiResult, ApiResultWithData } from "../../../util/ApiReturn";
import { OrderDataType, OrderProductDataType } from "../../../types/orders";
import {
  getAllUserOrdersRepository,
  getSpecificUserOrderRepository,
} from "../../data-access/orders/ordersRepository";

export async function createOrderService(orderData: OrderDataType) {
  return await prisma
    .$transaction(async (trans) => {
      // Initialize the total order amount
      let total = 0;
      const orderItems = [];

      // Check if the products exist and are in stock
      for (const product of orderData.products) {
        const productId = Number(product.productId);
        const quantity = Number(product.quantity);

        // Fetch current stock level for the product using the transaction
        const currentProduct = await trans.product.findUnique({
          where: { id: productId },
        });

        if (!currentProduct || currentProduct.quantity < quantity) {
          throw new Error(
            `Product ID ${productId} is not available in the requested quantity`
          );
        }

        // Calculate the actual quantity (limited by available stock)
        const actualQuantity = Math.min(quantity, currentProduct.quantity);

        // Add to total price
        total += actualQuantity * currentProduct.price;

        // Prepare order item and update available product quantity
        orderItems.push({ productId: productId, quantity: actualQuantity });

        // Update the product in the database with the new quantity
        await trans.product.update({
          where: { id: productId },
          data: { quantity: currentProduct.quantity - actualQuantity },
        });
      }

      // Create the order with order items using the transaction
      const newOrder = await trans.order.create({
        data: {
          userId: orderData.userId,
          total: total,
          status: "PENDING",
          orderItems: { create: orderItems },
        },
      });

      return newOrder;
    })
    .then((result) => {
      return ApiResultWithData.SuccessfulResult(result);
    })
    .catch((error) => {
      // Handle errors such as insufficient product quantity
      return ApiResult.FailedResult([error.message]);
    });
}

export async function getAllUserOrdersService(userId: number) {
  const userOrders = await getAllUserOrdersRepository(userId);

  if (userOrders.length === 0) {
    return ApiResult.FailedResult(["No orders found for the user"]);
  }
  return ApiResultWithData.SuccessfulResult(userOrders);
}

export async function getSpecificUserOrderService(
  userId: number,
  orderId: number
) {
  const userOrder = await getSpecificUserOrderRepository(userId, orderId);

  if (!userOrder) {
    return ApiResult.FailedResult(["No order found for the user"]);
  }

  return ApiResultWithData.SuccessfulResult(userOrder);
}
