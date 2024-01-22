import { ProductDataType } from "./product";

interface OrderDataType {
  userId: number;
  products: OrderProductDataType[];
}

interface OrderProductDataType {
  productId: number;
  quantity: number;
}

export { OrderDataType, OrderProductDataType };
