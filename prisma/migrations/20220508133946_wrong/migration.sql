/*
  Warnings:

  - You are about to drop the column `total` on the `product_orders` table. All the data in the column will be lost.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "product_orders" DROP COLUMN "total";
