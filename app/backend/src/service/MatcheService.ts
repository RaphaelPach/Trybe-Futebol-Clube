import { ModelStatic } from 'sequelize';
import CustomError from '../Error/CustomError';
import IMatcheService from '../interfaces/IMatcheService';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Team';

export default class MatcheService implements IMatcheService {
  protected modelService: ModelStatic<Matches> = Matches;
  protected modelTeams: ModelStatic<Teams> = Teams;

  async readAll(): Promise<Matches[]> {
    const matcheResult = await this.modelService.findAll({
      include: [{
        model: Teams,
        as: 'homeTeam',
        attributes: ['teamName'],
      },
      {
        model: Teams,
        as: 'awayTeam',
        attributes: ['teamName'],
      },
      ],
    });

    return matcheResult;
  }

  async finished(id: number) {
    this.modelService.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.modelService.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<Matches> {
    const away = await this.modelTeams.findByPk(awayTeamId);
    const home = await this.modelTeams.findByPk(homeTeamId);
    if (away === null || home === null) {
      throw new CustomError('There is no team with such id!', '404');
    }

    const result = await this.modelService.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return result;
  }
}
