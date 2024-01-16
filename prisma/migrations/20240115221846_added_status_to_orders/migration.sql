-- CreateEnum
CREATE TYPE "orderStatus" AS ENUM ('PENDING', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "orderStatus" NOT NULL DEFAULT 'PENDING';
