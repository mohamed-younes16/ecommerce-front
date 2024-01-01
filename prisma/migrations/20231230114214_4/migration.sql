/*
  Warnings:

  - Changed the type of `value` on the `size` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "sizevalue" AS ENUM ('S', 'M', 'L', 'XL', 'XXL', 'XXXL');

-- AlterTable
ALTER TABLE "size" DROP COLUMN "value",
ADD COLUMN     "value" "sizevalue" NOT NULL;
