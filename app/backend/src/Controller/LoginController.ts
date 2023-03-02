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
}
