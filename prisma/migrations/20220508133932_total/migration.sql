/*
  Warnings:

  - Added the required column `total` to the `product_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product_orders" ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;