import { ModelStatic } from 'sequelize';
import ITeam from '../interfaces/team.interface';
import modelTeams from '../models/Team';

export default class ServiceTeam {
  constructor(private team: ModelStatic<modelTeams>) {
    this.team = team;
  }

  async getAll(): Promise<modelTeams[]> {
    const result = await this.team.findAll();
    return result;
  }

  async getById(id: number): Promise<ITeam | null> {
    const result = await this.team.findByPk(id);
    return result;
  }
}
