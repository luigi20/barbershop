-- DropForeignKey
ALTER TABLE "barbershops" DROP CONSTRAINT "barbershops_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "open_hours" DROP CONSTRAINT "open_hours_barbershop_id_fkey";

-- AddForeignKey
ALTER TABLE "open_hours" ADD CONSTRAINT "open_hours_barbershop_id_fkey" FOREIGN KEY ("barbershop_id") REFERENCES "barbershops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barbershops" ADD CONSTRAINT "barbershops_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
