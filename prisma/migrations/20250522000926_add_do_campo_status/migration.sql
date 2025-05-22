/*
  Warnings:

  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" VARCHAR NOT NULL;

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "barbershop_services" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "barbershop_services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotions" (
    "id" TEXT NOT NULL,
    "barbershop_service_id" TEXT NOT NULL,
    "discount_amount" DOUBLE PRECISION NOT NULL,
    "status" VARCHAR NOT NULL,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendances" (
    "id" TEXT NOT NULL,
    "barbershop_id" TEXT NOT NULL,
    "barber_attendance_id" TEXT NOT NULL,
    "status" VARCHAR NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_services" (
    "attendance_id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_services_pkey" PRIMARY KEY ("attendance_id","service_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "barbershop_services_barbershop_id_service_id_key" ON "barbershop_services"("barbershop_id", "service_id");

-- CreateIndex
CREATE INDEX "attendances_barbershop_id_idx" ON "attendances"("barbershop_id");

-- CreateIndex
CREATE INDEX "attendance_services_attendance_id_idx" ON "attendance_services"("attendance_id");

-- CreateIndex
CREATE INDEX "attendance_services_service_id_idx" ON "attendance_services"("service_id");

-- AddForeignKey
ALTER TABLE "barbershop_services" ADD CONSTRAINT "barbershop_services_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershop_services" ADD CONSTRAINT "barbershop_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_barbershop_service_id_fkey" FOREIGN KEY ("barbershop_service_id") REFERENCES "barbershop_services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendances" ADD CONSTRAINT "attendances_barber_attendance_id_fkey" FOREIGN KEY ("barber_attendance_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_services" ADD CONSTRAINT "attendance_services_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "attendances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_services" ADD CONSTRAINT "attendance_services_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
