-- AlterTable
ALTER TABLE "students" ADD COLUMN     "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "verifiedAt" TEXT;

-- CreateTable
CREATE TABLE "clinicalReels" (
    "id" SERIAL NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "reelTitle" TEXT,
    "reelDescription" TEXT,
    "reelMediaUrl" TEXT NOT NULL,
    "referenceTags" TEXT[],

    CONSTRAINT "clinicalReels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reelLikes" (
    "id" SERIAL NOT NULL,
    "reelId" INTEGER,
    "liked_user_id" INTEGER,

    CONSTRAINT "reelLikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reelComments" (
    "id" SERIAL NOT NULL,
    "reelId" INTEGER,
    "comment_user_id" INTEGER,
    "comment" TEXT NOT NULL,
    "commented_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reelComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "clinicalReels" ADD CONSTRAINT "clinicalReels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reelLikes" ADD CONSTRAINT "reelLikes_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "clinicalReels"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reelComments" ADD CONSTRAINT "reelComments_reelId_fkey" FOREIGN KEY ("reelId") REFERENCES "clinicalReels"("id") ON DELETE SET NULL ON UPDATE CASCADE;
