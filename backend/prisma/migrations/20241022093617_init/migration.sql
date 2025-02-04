-- CreateTable
CREATE TABLE "QuestionReferences" (
    "id" SERIAL NOT NULL,
    "questionsId" INTEGER,
    "reference" TEXT,

    CONSTRAINT "QuestionReferences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionReferences" ADD CONSTRAINT "QuestionReferences_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
