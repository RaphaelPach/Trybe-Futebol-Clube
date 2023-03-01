import ITeams from './ITeams';

export default interface IServiceTeams {
  findAll(): Promise<ITeams[]>
}
