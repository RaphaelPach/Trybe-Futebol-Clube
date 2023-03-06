import * as express from 'express';
import { Router } from 'express';
import MatcheService from '../service/MatcheService';
import MatchesController from '../Controller/MatcheController';
import tokenValidate from '../midllewares/tokenValidate';
import equalTeams from '../midllewares/equalTeams';

const matcheRouter = Router();

matcheRouter.use(express.json());

const matcheService = new MatcheService();
const matcheController = new MatchesController(matcheService);

matcheRouter.get(
  '/',
  (req: express.Request, res: express.Response) => matcheController.readAll(req, res),
);
matcheRouter.patch(
  '/:id/finish',
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    tokenValidate(req, res, next),
  (req: express.Request, res: express.Response) => matcheController.updateMatches(req, res),
);

matcheRouter.patch(
  '/:id',
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    tokenValidate(req, res, next),
  (req: express.Request, res: express.Response) => matcheController.updateGoals(req, res),
);

matcheRouter.post(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    tokenValidate(req, res, next),

  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    equalTeams(req, res, next),

  (req: express.Request, res: express.Response) => matcheController.createMatche(req, res),
);

export default matcheRouter;
