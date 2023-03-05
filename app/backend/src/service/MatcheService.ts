import { ModelStatic } from 'sequelize';
import IMatcheService from '../interfaces/IMatcheService';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Team';

export default class MatcheService implements IMatcheService {
  protected modelService: ModelStatic<Matches> = Matches;

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
}
