-- CreateTable
CREATE TABLE "billBoard" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billBoard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "billBoard_id_key" ON "billBoard"("id");

-- AddForeignKey
ALTER TABLE "billBoard" ADD CONSTRAINT "billBoard_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
