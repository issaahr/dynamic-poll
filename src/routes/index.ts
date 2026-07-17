import { Router } from 'express';
import { healthRouter } from './health.routes.js';
import { pollsRouter } from './polls.routes.js';

export const router = Router();

router.use('/health', healthRouter);
router.use('/polls', pollsRouter);
