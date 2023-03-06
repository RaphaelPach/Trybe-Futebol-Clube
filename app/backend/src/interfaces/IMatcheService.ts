import Matches from '../database/models/Matches';

export default interface IMatchesService {
  readAll(): Promise<Matches[]>;
  finished(id: number): void;
  updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): void
  createMatch(
    homeTeamId: number,
    awayTeamId: number,
    homeTeamGoals: number,
    awayTeamGoals: number): void;
}
