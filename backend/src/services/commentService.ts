// commentService.ts: Manages comment operations for posts

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const commentService = {
  async addComment(postId: string, userId: number, content: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    return await prisma.comments.create({
      data: { postsId : parseInt(postId), commented_user_id : userId, comment : content },
      // include: { user: true }
    });
  },
};