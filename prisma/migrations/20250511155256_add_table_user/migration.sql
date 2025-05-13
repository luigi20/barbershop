/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Barber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Barber` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Barber_user_id_key" ON "Barber"("user_id");

-- AddForeignKey
ALTER TABLE "Barber" ADD CONSTRAINT "Barber_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
