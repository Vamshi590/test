-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" TEXT,
    "idNo" TEXT,
    "collegeName" TEXT,
    "graduatingYear" TEXT,
    "idlink" TEXT,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
