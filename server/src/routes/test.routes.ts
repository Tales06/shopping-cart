import { Router, Request, Response } from 'express';

const router = Router();

router.post('/test', (req: Request, res: Response) => {
  res.status(200).json({ message: 'POST funzionante', body: req.body });
});

export default router;
