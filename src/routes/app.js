import userRouter from './users.route.js';
import authRouter from './auth.route.js';
import eventRouter from './event.route.js';
import { Router } from 'express';

const  router = Router();
router.use('/', userRouter);
router.use('/', authRouter);
router.use('/', eventRouter);

export default router;