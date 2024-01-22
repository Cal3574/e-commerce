import prisma from "../../../config/prisma";
import { OrderDataType } from "../../../types/orders";

export async function createOrderRepository(order: any) {
  const newOrder = await prisma.order
    .create({
      data: {
        ...order,
      },
    })
    .catch((e) => {
      console.log(e);
    });

  return newOrder;
}

export async function getAllUserOrdersRepository(userId: number) {
  console.log("userid" + userId);
  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  console.log(orders);
  return orders;
}

export async function getSpecificUserOrderRepository(
  userId: number,
  orderId: number
) {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      userId: userId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
}
