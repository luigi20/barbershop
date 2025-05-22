/*
  Warnings:

  - Added the required column `status` to the `barbershop_services` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status_Barbershop" AS ENUM ('ABERTA', 'FECHADA');

-- AlterTable
ALTER TABLE "barbershop_services" ADD COLUMN     "status" "Status_Barbershop" NOT NULL;
