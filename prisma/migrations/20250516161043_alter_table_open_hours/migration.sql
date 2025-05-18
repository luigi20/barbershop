/*
  Warnings:

  - Added the required column `created_at` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `members` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "members" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "open_hours" ALTER COLUMN "open_time" SET DATA TYPE TIME,
ALTER COLUMN "close_time" SET DATA TYPE TIME;
