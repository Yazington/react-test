import { Router, Request, Response } from 'express';
import { aggregateRepos } from '../controllers/repos';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  const data = await aggregateRepos();
  console.log(data.length);
  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json(JSON.stringify(data));
});
