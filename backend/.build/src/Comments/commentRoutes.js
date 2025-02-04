// commentRoutes.ts: Handles comment-related endpoints
import { Hono } from 'hono';
import { commentService } from '../services/commentService';
const comments = new Hono();
comments.post('/comment', async (c) => {
    try {
        const { postId, userId, content } = await c.req.json();
        const comment = await commentService.addComment(postId, parseInt(userId), content, c.env);
        return c.json({ success: true, comment });
    }
    catch (error) {
        console.error('Comment error:', error);
        return c.json({
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred"
        }, 500);
    }
});
export default comments;
