import {
  addProduct,
  allProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../data-access/product/productRepository";
import { ApiResult, ApiResultWithData } from "../../../return/ApiReturn";
import { ProductDataType } from "../../../types/product";

// Service function to add a product
export async function addProductService(
  productData: ProductDataType
): Promise<ApiResultWithData<any>> {
  const newProduct = await addProduct(productData);
  return ApiResultWithData.SuccessfulResult(newProduct);
}

export async function getAllProductsService(): Promise<ApiResultWithData<any>> {
  const products = await allProducts();
  return ApiResultWithData.SuccessfulResult(products);
}

export async function getProductByIdService(
  id: number
): Promise<ApiResultWithData<any>> {
  const product = await getProductById(id);
  return ApiResultWithData.SuccessfulResult(product);
}

export async function deleteProductService(id: number): Promise<ApiResult> {
  await deleteProduct(id);
  return ApiResult.SuccessfulResult();
}

// Type Constraints
// T extends Partial<ProductDataType>: This generic constraint means that productData can be an object with any subset of the properties defined in ProductDataType. It allows for updating one or more fields of the product without needing to provide the entire product data structure.

export async function updateProductService<T extends Partial<ProductDataType>>(
  id: number,
  productData: T
): Promise<ApiResultWithData<any>> {
  const updatedProduct = await updateProduct(id, productData);
  return ApiResultWithData.SuccessfulResult(updatedProduct);
}
