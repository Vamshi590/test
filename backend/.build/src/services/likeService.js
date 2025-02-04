import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
export const likeService = {
    async addLike(userId, postsId, env) {
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
    async removeLike(userId, postId, env) {
        const prisma = new PrismaClient({
            datasourceUrl: env.DATABASE_URL,
        }).$extends(withAccelerate());
        return prisma.likes.deleteMany({
            where: {
                liked_user_id: parseInt(userId),
                postsId: parseInt(postId)
            },
        });
    },
    async getLikesForPost(postId, env) {
        const prisma = new PrismaClient({
            datasourceUrl: env.DATABASE_URL,
        }).$extends(withAccelerate());
        return prisma.likes.findMany({
            where: { postsId: parseInt(postId) },
        });
    }
};
