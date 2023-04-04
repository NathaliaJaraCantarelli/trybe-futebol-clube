import { ModelStatic } from 'sequelize';
import modelMatches from '../models/Matches';
import modelTeams from '../models/Team';

export default class ServiceMatches {
  constructor(
    private matches: ModelStatic<modelMatches>,
    private team: ModelStatic<modelTeams>,
  ) {
    this.matches = matches;
    this.team = team;
  }

  async getAll(): Promise<modelMatches[]> {
    const result = await this.matches.findAll({
      include: [
        {
          model: this.team,
          as: 'awayTeam',
        },
        {
          model: this.team,
          as: 'homeTeam',
        }],
    });
    return result;
  }
}
