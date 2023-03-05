import { Request, Response } from 'express';
import IMatchesService from '../interfaces/IMatcheService';

export default class MatchesController {
  private _matcheService: IMatchesService;
  constructor(service: IMatchesService) {
    this._matcheService = service;
  }

  public async readAll(req: Request, res: Response) {
    const result = await this._matcheService.readAll();
    const { inProgress } = req.query;
    if (inProgress) {
      const filterMatches = result
        .filter((match) => match.dataValues.inProgress.toString() === inProgress);
      console.log(result);

      return res.status(200).json(filterMatches);
    }
    return res.status(200).json(result);
  }
}
