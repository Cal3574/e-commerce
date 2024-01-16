import { ApiResult, ApiResultWithData } from "../../../return/ApiReturn";
import { createOrderRepository } from "../../data-access/orders/ordersRepository";
import { getProductById } from "../../data-access/product/productRepository";
import { updateProductService } from "../product/productService";
export async function createOrderService(orderData: any) {
  //destructure the product ids

  console.log(orderData, "orderData");

  const productIds = orderData.products.map((product: any) => {
    const order = {
      productId: Number(product.productId),
      quantity: Number(product.quantity),
    };
    return order;
  });

  console.log(productIds, "productIds");
  //check if the products exist and are in stock

  let availableProducts: any = [];

  for (let i = 0; i < productIds.length; i++) {
    const product = await getProductById(productIds[i].productId);
    if (product && product.quantity > 0) {
      availableProducts.push({
        ...product,
      });
    }
  }

  if (availableProducts.length === 0) {
    return ApiResult.FailedResult(["The selected products are not available"]);
  }

  //check if we have enough stock for the user to buy the requested quantity

  //calculate the total
  const total = availableProducts.reduce((acc: any, product: any) => {
    return acc + product.price * product.quantity;
  }, 0);

  const formattedOrder = {
    userId: 27,
    total: total,
    status: "PENDING",
    products: {
      connect: availableProducts.map((product: any) => {
        return { id: product.id };
      }),
    },
  };

  //create the order
  const newOrder = await createOrderRepository(formattedOrder);

  //update the product quantities
  const productUpdates = availableProducts.map((product: any) => {
    return {
      id: product.id,
      quantity:
        product.quantity -
        productIds.find((p: any) => p.productId === product.id).quantity,
    };
  });

  await Promise.allSettled(
    productUpdates.map((product: any) => {
      return updateProductService(product.id, product);
    })
  );

  return ApiResultWithData.SuccessfulResult(newOrder);
}
