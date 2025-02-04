-- AlterTable
ALTER TABLE "User" ADD COLUMN     "department" TEXT,
ADD COLUMN     "gender" TEXT;

-- CreateTable
CREATE TABLE "Organisations" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "organisation_name" TEXT,
    "country" TEXT,
    "city" TEXT,
    "organisation_type" TEXT,
    "register_number" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "founding_year" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organisations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisations_email_key" ON "Organisations"("email");
