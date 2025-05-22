-- CreateEnum
CREATE TYPE "Attendance_Status" AS ENUM ('ATIVO', 'REAGENDADO', 'AGENDADO', 'FINALIZADO');

-- DropForeignKey
ALTER TABLE "barbershop_services" DROP CONSTRAINT "barbershop_services_barbershop_id_fkey";

-- CreateTable
CREATE TABLE "scheduling" (
    "id" TEXT NOT NULL,
    "attendance_id" TEXT NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "scheduling_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "scheduling_attendance_id_key" ON "scheduling"("attendance_id");

-- CreateIndex
CREATE INDEX "attendances_barber_attendance_id_idx" ON "attendances"("barber_attendance_id");

-- CreateIndex
CREATE INDEX "barbershop_services_barbershop_id_idx" ON "barbershop_services"("barbershop_id");

-- CreateIndex
CREATE INDEX "barbershop_services_service_id_idx" ON "barbershop_services"("service_id");

-- CreateIndex
CREATE INDEX "promotions_barbershop_service_id_idx" ON "promotions"("barbershop_service_id");

-- AddForeignKey
ALTER TABLE "barbershop_services" ADD CONSTRAINT "barbershop_services_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "scheduling" ADD CONSTRAINT "scheduling_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "attendances"("id") ON DELETE CASCADE ON UPDATE CASCADE;
