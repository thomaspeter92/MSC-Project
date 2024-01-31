-- CreateTable
CREATE TABLE "Connections" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "initiator_id" INTEGER NOT NULL,
    "target_id" INTEGER NOT NULL,

    CONSTRAINT "Connections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Connections_initiator_id_target_id_key" ON "Connections"("initiator_id", "target_id");

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_initiator_id_fkey" FOREIGN KEY ("initiator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Connections" ADD CONSTRAINT "Connections_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
