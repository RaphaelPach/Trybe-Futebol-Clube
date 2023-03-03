import { Request, Response } from 'express';
import ILoginService from '../interfaces/ILoginService';

export default class LoginController {
  private _loginService: ILoginService;
  constructor(service: ILoginService) {
    this._loginService = service;
  }

  public async valid(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await this._loginService.valid(email, password);
    return res.status(200).json({ token });
  }

  public async getByRole(req: Request, res: Response) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    const result = await this._loginService.getByRole(authorization);
    return res.status(200).json(result);
  }
}
