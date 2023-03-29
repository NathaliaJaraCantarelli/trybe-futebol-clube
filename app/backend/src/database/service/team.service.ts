import { ModelStatic } from 'sequelize';
import modelTeams from '../models/Team';

export default class ServiceTeam {
  constructor(private team: ModelStatic<modelTeams>) {
    this.team = team;
  }

  async getAll(): Promise<modelTeams[]> {
    const result = await this.team.findAll();
    return result;
  }
}
