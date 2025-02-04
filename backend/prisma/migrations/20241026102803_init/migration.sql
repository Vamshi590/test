-- CreateTable
CREATE TABLE "AchievementsAwards" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "awardName" TEXT,
    "awardedBy" TEXT,
    "awardedOn" TEXT,
    "descreption" TEXT,

    CONSTRAINT "AchievementsAwards_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AchievementsAwards" ADD CONSTRAINT "AchievementsAwards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
