import Team from '../database/models/Team';
import ITeams from './ITeams';

export default interface IServiceTeams {
  findAll(): Promise<ITeams[]>;
  findById(id: number): Promise<Team | null>;
}
