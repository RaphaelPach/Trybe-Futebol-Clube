import * as express from 'express';
import { Router } from 'express';
import MatcheService from '../service/MatcheService';
import MatchesController from '../Controller/MatcheController';

const matcheRouter = Router();

matcheRouter.use(express.json());

const matcheService = new MatcheService();
const matcheController = new MatchesController(matcheService);

matcheRouter.get(
  '/',
  (req: express.Request, res: express.Response) => matcheController.readAll(req, res),
);

export default matcheRouter;
