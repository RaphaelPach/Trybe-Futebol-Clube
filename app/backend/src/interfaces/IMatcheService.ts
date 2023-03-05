import Matches from '../database/models/Matches';

export default interface IMatchesService {
  readAll(): Promise<Matches[]>;
  finished(id: number): void;
}
