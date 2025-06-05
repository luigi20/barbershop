/*
  Warnings:

  - Changed the type of `status` on the `attendances` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "attendances" DROP COLUMN "status",
ADD COLUMN     "status" "Attendance_Status" NOT NULL;
