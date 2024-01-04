-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "smokes" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "orientation" TEXT NOT NULL,
    "body_type" TEXT NOT NULL,
    "diet" TEXT NOT NULL,
    "drinks" TEXT NOT NULL,
    "drugs" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "job" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "offspring" TEXT NOT NULL,
    "pets" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "speaks" TEXT NOT NULL,
    "essay0" TEXT,
    "essay1" TEXT,
    "essay2" TEXT,
    "essay3" TEXT,
    "essay4" TEXT,
    "essay5" TEXT,
    "essay6" TEXT,
    "essay7" TEXT,
    "essay8" TEXT,
    "essay9" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
