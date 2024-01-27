-- CreateEnum
CREATE TYPE "category" AS ENUM ('PHONE', 'HEALTH', 'COMPUTERS', 'WATCHES', 'HEADPHONES', 'BOOKS', 'OTHER');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "category" "category" NOT NULL DEFAULT 'OTHER';
