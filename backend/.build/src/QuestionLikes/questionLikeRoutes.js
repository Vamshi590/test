import { Hono } from 'hono';
import { questionLikeService } from '../services/questionLikeService';
const questionLikes = new Hono();
questionLikes.post('/like', async (c) => {
    const { userId, questionId } = await c.req.json();
    const like = await questionLikeService.addLike(parseInt(userId), questionId, c.env);
    return c.json({ message: 'Question liked', like });
});
questionLikes.delete('/like', async (c) => {
    const { userId, questionId } = await c.req.json();
    await questionLikeService.removeLike(parseInt(userId), questionId, c.env);
    return c.json({ message: 'Like removed' });
});
questionLikes.post('/dislike', async (c) => {
    const { userId, questionId } = await c.req.json();
    const dislike = await questionLikeService.addDislike(parseInt(userId), questionId, c.env);
    return c.json({ message: 'Question disliked', dislike });
});
questionLikes.delete('/dislike', async (c) => {
    const { userId, questionId } = await c.req.json();
    await questionLikeService.removeDislike(parseInt(userId), questionId, c.env);
    return c.json({ message: 'Dislike removed' });
});
export default questionLikes;
