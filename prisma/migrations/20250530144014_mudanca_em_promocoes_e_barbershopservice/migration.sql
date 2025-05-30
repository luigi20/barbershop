/*
  Warnings:

  - The primary key for the `barbershop_services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `barbershop_services` table. All the data in the column will be lost.
  - You are about to drop the column `barbershop_service_id` on the `promotions` table. All the data in the column will be lost.
  - Added the required column `barbershop_id` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_id` to the `promotions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "promotions" DROP CONSTRAINT "promotions_barbershop_service_id_fkey";

-- DropIndex
DROP INDEX "promotions_barbershop_service_id_idx";

-- AlterTable
ALTER TABLE "barbershop_services" DROP CONSTRAINT "barbershop_services_pkey",
DROP COLUMN "id";

-- AlterTable
ALTER TABLE "members" ALTER COLUMN "role" DROP DEFAULT;

-- AlterTable
ALTER TABLE "promotions" DROP COLUMN "barbershop_service_id",
ADD COLUMN     "barbershop_id" TEXT NOT NULL,
ADD COLUMN     "service_id" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "promotions_barbershop_id_idx" ON "promotions"("barbershop_id");

-- CreateIndex
CREATE INDEX "promotions_service_id_idx" ON "promotions"("service_id");

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_barbershop_id_service_id_fkey" FOREIGN KEY ("barbershop_id", "service_id") REFERENCES "barbershop_services"("barbershop_id", "service_id") ON DELETE CASCADE ON UPDATE CASCADE;
