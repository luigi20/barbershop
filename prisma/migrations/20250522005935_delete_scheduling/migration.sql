/*
  Warnings:

  - You are about to drop the `scheduling` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "scheduling" DROP CONSTRAINT "scheduling_attendance_id_fkey";

-- DropTable
DROP TABLE "scheduling";
