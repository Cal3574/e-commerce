import prisma from "../../../config/prisma";
import { ProductDataType } from "../../../types/product";

// Function to add a product
export async function addProduct(productData: ProductDataType) {
  // Use Prisma's create method to add a new product to the database
  const newProduct = await prisma.product.create({
    data: productData,
  });

  return newProduct;
}

// Function to get all products
export async function allProducts() {
  const products = await prisma.product.findMany();
  return products;
}

// Function to get a product by ID
export async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id: id,
    },
  });
  return product;
}
// Function to delete a product by ID
export async function deleteProduct(id: number) {
  const deleted = await prisma.product.delete({
    where: {
      id: id,
    },
  });
  return deleted;
}

// Function to update a product by ID
export async function updateProduct(
  id: number,
  productData: Partial<ProductDataType>
) {
  const updated = await prisma.product.update({
    where: {
      id: id,
    },
    data: productData,
  });
  return updated;
}
