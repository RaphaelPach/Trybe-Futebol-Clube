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

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const response = await this._TeamService.findById(+id);
    if (!response) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(response);
  }
}
