import * as express from 'express';
import { Router } from 'express';
import TeamService from '../service/TeamService';
import TeamController from '../Controller/TeamController';

const teamRoute = Router();

teamRoute.use(express.json());

const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoute.get(
  '/',
  (req: express.Request, res: express.Response) => teamController.findAll(req, res),
);

export default teamRoute;
