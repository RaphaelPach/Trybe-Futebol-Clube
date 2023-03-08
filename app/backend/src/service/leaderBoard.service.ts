import sequelize from '../database/models';
import queryLeader from '../Utils/queryBoard';

export default class LeaderBoardService {
  public static async findAll() {
    const [query] = await sequelize.query(queryLeader);
    return query;
  }
}
