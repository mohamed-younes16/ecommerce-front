-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "billboardId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category" ADD CONSTRAINT "category_billboardId_fkey" FOREIGN KEY ("billboardId") REFERENCES "billBoard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
