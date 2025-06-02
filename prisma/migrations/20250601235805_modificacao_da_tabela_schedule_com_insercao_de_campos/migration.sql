/*
  Warnings:

  - You are about to drop the `Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_attendance_id_fkey";

-- DropTable
DROP TABLE "Schedule";

-- CreateTable
CREATE TABLE "schedules" (
    "id" TEXT NOT NULL,
    "attendance_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedules_attendance_id_key" ON "schedules"("attendance_id");

-- CreateIndex
CREATE INDEX "schedules_user_id_idx" ON "schedules"("user_id");

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_attendance_id_fkey" FOREIGN KEY ("attendance_id") REFERENCES "attendances"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "schedules" ADD CONSTRAINT "schedules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
