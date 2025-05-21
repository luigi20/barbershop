/*
  Warnings:

  - You are about to alter the column `city` on the `barbershops` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(120)`.
  - You are about to alter the column `street` on the `barbershops` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "barbershops" ALTER COLUMN "city" SET DATA TYPE VARCHAR(120),
ALTER COLUMN "number" SET DATA TYPE VARCHAR(40),
ALTER COLUMN "street" SET DATA TYPE VARCHAR(100);
