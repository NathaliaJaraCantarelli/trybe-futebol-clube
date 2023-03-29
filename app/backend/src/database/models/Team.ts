import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    type: STRING,
  },
}, {
  modelName: 'teams',
  sequelize: db,
  timestamps: false,
  underscored: true,
});

export default Team;
