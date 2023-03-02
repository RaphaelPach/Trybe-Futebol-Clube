import { ModelStatic } from 'sequelize';
import Team from '../database/models/Team';
import ITeams from '../interfaces/ITeams';
import IServiceTeam from '../interfaces/IServiceTeam';

export default class TeamService implements IServiceTeam {
  protected teamModel: ModelStatic<Team> = Team;
  public async findAll(): Promise<ITeams[]> {
    return this.teamModel.findAll();
  }

  public async findById(id: number): Promise<Team | null> {
    return this.teamModel.findByPk(id);
  }
}
