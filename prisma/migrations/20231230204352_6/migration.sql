/*
  Warnings:

  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "isPaid" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "orderItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- CreateIndex
CREATE INDEX "order_id_idx" ON "order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orderItem_id_key" ON "orderItem"("id");

-- CreateIndex
CREATE INDEX "orderItem_id_idx" ON "orderItem"("id");

-- CreateIndex
CREATE INDEX "Image_id_idx" ON "Image"("id");

-- CreateIndex
CREATE INDEX "Store_id_idx" ON "Store"("id");

-- CreateIndex
CREATE INDEX "billBoard_id_idx" ON "billBoard"("id");

-- CreateIndex
CREATE INDEX "category_id_idx" ON "category"("id");

-- CreateIndex
CREATE INDEX "color_id_idx" ON "color"("id");

-- CreateIndex
CREATE INDEX "product_id_idx" ON "product"("id");

-- CreateIndex
CREATE INDEX "size_id_idx" ON "size"("id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
