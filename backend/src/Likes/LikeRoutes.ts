import { Hono } from 'hono';
import { likeService } from '../services/likeService';
const likeRoutes = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    REDIS_URL: string;
    REDIS_TOKEN: string;
  }
}>();

likeRoutes.post('/like', async (c) => {
  const { userId, postId } = await c.req.json();
  const like = await likeService.addLike(userId, postId, c.env);
  return c.json({ message: 'Post liked', like });
});

likeRoutes.delete('/like', async (c) => {
  const { userId, postId } = await c.req.json();
  await likeService.removeLike(userId, postId, c.env);
  return c.json({ message: 'Like removed' });
});

likeRoutes.get('/likes/:postId', async (c) => {
  const { postId } = c.req.param();
  const likes = await likeService.getLikesForPost(postId, c.env);
  return c.json({ likes });
});

export default likeRoutes;