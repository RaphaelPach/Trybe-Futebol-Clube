import * as express from 'express';
import { Router } from 'express';
import LeaderBoardController from '../Controller/leaderBoard.controller';

const leaderRouter = Router();
leaderRouter.use(express.json());

leaderRouter.get('/home', (req: express.Request, res: express.Response) =>
  LeaderBoardController.findAll(req, res));

export default leaderRouter;
