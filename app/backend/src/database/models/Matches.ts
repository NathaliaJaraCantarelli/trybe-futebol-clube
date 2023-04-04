import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Matches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
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
  },
  homeTeamGoals: {
    type: INTEGER,
  },
  awayTeamId: {
    type: INTEGER,
  },
  awayTeamGoals: {
    type: INTEGER,
  },
  inProgress: {
    type: BOOLEAN,
  },
}, {
  modelName: 'matches',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

Matches.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Team.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeMatch' });
Team.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayMatch' });

export default Matches;
