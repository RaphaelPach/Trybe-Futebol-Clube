import { INTEGER, Model, BOOLEAN } from 'sequelize';
import db from '.';
import Teams from './Team';

class Matches extends Model {
  declare readonly id: number;
  declare homeTeamGoals: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeamId' });
Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Matches;
