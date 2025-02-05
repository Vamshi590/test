-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_commented_user_id_fkey" FOREIGN KEY ("commented_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
