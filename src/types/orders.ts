import { ProductDataType } from "./product";

interface OrderDataType {
  userId: number;
  products: ProductDataType[];
  total: number;
}

export { OrderDataType };
