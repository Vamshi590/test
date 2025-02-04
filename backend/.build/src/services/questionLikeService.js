import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
export const questionLikeService = {
    async addLike(userId, questionId, env) {
        const prisma = new PrismaClient({
            datasourceUrl: env.DATABASE_URL,
        }).$extends(withAccelerate());
        return prisma.questionLikes.create({
            data: {
                liked_user_id: userId,
                questionsId: questionId
            }
        });
    },
    async removeLike(userId, questionId, env) {
        const prisma = new PrismaClient({
            datasourceUrl: env.DATABASE_URL,
        }).$extends(withAccelerate());
        return prisma.questionLikes.deleteMany({
            where: {
                liked_user_id: userId,
                questionsId: questionId
            }
        });
    },
    async addDislike(userId, questionId, env) {
        const prisma = new PrismaClient({
            datasourceUrl: env.DATABASE_URL,
        }).$extends(withAccelerate());
        // First remove any existing like
        await this.removeLike(userId, questionId, env);
        return prisma.questionLikes.create({
            data: {
                disliked_user_id: userId,
                questionsId: questionId
            }
        });
    },
    async removeDislike(userId, questionId, env) {
        const prisma = new PrismaClient({
            datasourceUrl: env.DATABASE_URL,
        }).$extends(withAccelerate());
        return prisma.questionLikes.deleteMany({
            where: {
                disliked_user_id: userId,
                questionsId: questionId
            }
        });
    }
};
