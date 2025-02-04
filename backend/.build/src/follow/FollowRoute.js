import { Hono } from 'hono';
import { followUser } from './FollowUser';
const followRoute = new Hono();
// Follow route
followRoute.post('/:followingId/:followerId', followUser);
export default followRoute;
