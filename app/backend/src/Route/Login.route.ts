import * as express from 'express';
import { Router } from 'express';
import LoginService from '../service/LoginService';
import LoginController from '../Controller/LoginController';
import VLogin from '../midllewares/VLogin';

const loginRoute = Router();

loginRoute.use(express.json());

const loginService = new LoginService();
const loginController = new LoginController(loginService);

loginRoute.post(
  '/',
  (req: express.Request, res: express.Response, next: express.NextFunction) =>
    VLogin(req, res, next),
  (req: express.Request, res: express.Response) => loginController.valid(req, res),
);

export default loginRoute;
