-- CreateTable
CREATE TABLE "QuestionLikes" (
    "id" SERIAL NOT NULL,
    "questionsId" INTEGER,
    "liked_user_id" INTEGER,
    "disliked_user_id" INTEGER,

    CONSTRAINT "QuestionLikes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionLikes" ADD CONSTRAINT "QuestionLikes_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
