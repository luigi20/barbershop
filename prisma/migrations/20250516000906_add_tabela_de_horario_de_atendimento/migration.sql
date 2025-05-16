-- CreateTable
CREATE TABLE "open_hours" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "day_week" INTEGER NOT NULL,
    "open_time" TIMESTAMP(3) NOT NULL,
    "close_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "open_hours_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "open_hours" ADD CONSTRAINT "open_hours_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
