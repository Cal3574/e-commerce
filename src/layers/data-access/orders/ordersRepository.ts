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
