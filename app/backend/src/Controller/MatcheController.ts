import { Request, Response } from 'express';
import IMatchesService from '../interfaces/IMatcheService';

export default class MatchesController {
  private _matcheService: IMatchesService;
  constructor(service: IMatchesService) {
    this._matcheService = service;
  }

  public async readAll(_req: Request, res: Response) {
    const result = await this._matcheService.readAll();
    console.log(result);
    return res.status(200).json(result);
  }
}
