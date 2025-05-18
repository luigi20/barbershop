/*
  Warnings:

  - You are about to drop the column `organization_id` on the `members` table. All the data in the column will be lost.
  - You are about to drop the column `owner_id` on the `open_hours` table. All the data in the column will be lost.
  - You are about to drop the `organizations` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[barbershop_id,user_id]` on the table `members` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barbershop_id` to the `members` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barbershop_id` to the `open_hours` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "members" DROP CONSTRAINT "members_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "open_hours" DROP CONSTRAINT "open_hours_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_owner_id_fkey";

-- DropIndex
DROP INDEX "members_organization_id_user_id_key";

-- AlterTable
ALTER TABLE "members" DROP COLUMN "organization_id",
ADD COLUMN     "barbershop_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "open_hours" DROP COLUMN "owner_id",
ADD COLUMN     "barbershop_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "organizations";

-- CreateTable
CREATE TABLE "barbershops" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "barbershops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "members_barbershop_id_user_id_key" ON "members"("barbershop_id", "user_id");

-- AddForeignKey
ALTER TABLE "barbershops" ADD CONSTRAINT "barbershops_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "open_hours" ADD CONSTRAINT "open_hours_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "members" ADD CONSTRAINT "members_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
