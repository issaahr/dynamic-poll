import { Router, type Request, type Response } from 'express';

export const pollsRouter = Router();

pollsRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({ polls: [] });
});
