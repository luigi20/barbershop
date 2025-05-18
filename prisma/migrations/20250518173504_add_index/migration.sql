-- CreateIndex
CREATE INDEX "barbershops_owner_id_idx" ON "barbershops"("owner_id");

-- CreateIndex
CREATE INDEX "members_barbershop_id_idx" ON "members"("barbershop_id");

-- CreateIndex
CREATE INDEX "open_hours_barbershop_id_idx" ON "open_hours"("barbershop_id");
