/*
  Warnings:

  - Changed the type of `status` on the `barbershop_services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "barbershop_services" DROP COLUMN "status",
ADD COLUMN     "status" VARCHAR NOT NULL;

-- DropEnum
DROP TYPE "Status_Barbershop";
