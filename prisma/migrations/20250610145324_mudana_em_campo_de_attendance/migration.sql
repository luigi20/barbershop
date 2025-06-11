/*
  Warnings:

  - Added the required column `barbershop_id` to the `attendance_services` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "attendance_services" DROP CONSTRAINT "attendance_services_service_id_fkey";

-- AlterTable
ALTER TABLE "attendance_services" ADD COLUMN     "barbershop_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "attendance_services" ADD CONSTRAINT "attendance_services_barbershop_id_service_id_fkey" FOREIGN KEY ("barbershop_id", "service_id") REFERENCES "barbershop_services"("barbershop_id", "service_id") ON DELETE CASCADE ON UPDATE CASCADE;
