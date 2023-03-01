import { Request, Response } from 'express';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamController {
  private _TeamService: IServiceTeam;
  constructor(service: IServiceTeam) {
    this._TeamService = service;
  }

  async findAll(_req: Request, res: Response) {
    const result = await this._TeamService.findAll();
    return res.status(200).json(result);
  }
}
