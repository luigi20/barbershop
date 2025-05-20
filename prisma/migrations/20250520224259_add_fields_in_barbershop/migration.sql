/*
  Warnings:

  - You are about to alter the column `password` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - Added the required column `city` to the `barbershops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `barbershops` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `barbershops` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "barbershops" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "number" INTEGER NOT NULL,
ADD COLUMN     "phone" VARCHAR,
ADD COLUMN     "street" TEXT NOT NULL;
