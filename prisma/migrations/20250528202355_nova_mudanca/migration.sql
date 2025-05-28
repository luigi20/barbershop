/*
  Warnings:

  - You are about to alter the column `phone` on the `barbershops` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(13)`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" SET DATA TYPE CHAR(13);

-- AlterTable
ALTER TABLE "barbershops" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(13);
