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
export async function addProductService(productData: ProductDataType) {
  const newProduct = await addProduct(productData);
  return ApiResultWithData.SuccessfulResult(newProduct);
}

export async function getAllProductsService() {
  const products = await allProducts();
  return ApiResultWithData.SuccessfulResult(products);
}

export async function getProductByIdService(id: number) {
  const product = await getProductById(id);
  return ApiResultWithData.SuccessfulResult(product);
}

export async function deleteProductService(id: number) {
  await deleteProduct(id);
  return ApiResult.SuccessfulResult();
}

export async function updateProductService(
  id: number,
  productData: ProductDataType
) {
  const updatedProduct = await updateProduct(id, productData);
  return ApiResultWithData.SuccessfulResult(updatedProduct);
}
