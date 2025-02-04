import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const likeService = {
  async addLike(userId: string, postsId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma.likes.create({
      data: { 
        liked_user_id: parseInt(userId), 
        postsId: parseInt(postsId)
      },
    });
  },

  async removeLike(userId: string, postId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma.likes.deleteMany({
      where: { 
        liked_user_id: parseInt(userId), 
        postsId : parseInt(postId) 
      },
    });
  },

  async getLikesForPost(postId: string, env: any) {
    const prisma = new PrismaClient({
      datasourceUrl: env.DATABASE_URL,
    }).$extends(withAccelerate());

    return prisma.likes.findMany({
      where: { postsId : parseInt(postId) },
    });
  }
};