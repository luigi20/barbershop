/*
  Warnings:

  - You are about to drop the column `status` on the `barbershop_services` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Status_Barbershop" AS ENUM ('ABERTA', 'FECHADA');

-- AlterTable
ALTER TABLE "barbershop_services" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "barbershops" ADD COLUMN     "status" "Status_Barbershop" NOT NULL DEFAULT 'ABERTA';
