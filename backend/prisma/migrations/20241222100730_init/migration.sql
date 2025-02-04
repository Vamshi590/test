-- CreateTable
CREATE TABLE "Doctors" (
    "id" SERIAL NOT NULL,
    "registrationNo" TEXT NOT NULL,
    "doctors" TEXT NOT NULL,

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("id")
);
