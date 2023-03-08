import { Request, Response } from 'express';
import LeaderBoardService from '../service/leaderBoard.service';

export default class LeaderBoardController {
  public static async findAll(_req: Request, res: Response) {
    const result = await LeaderBoardService.findAll();
    return res.status(200).json(result);
  }
}
