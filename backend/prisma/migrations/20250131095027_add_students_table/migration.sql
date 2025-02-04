-- CreateTable
CREATE TABLE "Students" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "name" TEXT,
    "idNo" TEXT,
    "collegeName" TEXT,
    "graduatingYear" TEXT,
    "idlink" TEXT,

    CONSTRAINT "Students_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
