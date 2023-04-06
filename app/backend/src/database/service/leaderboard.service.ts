import { ModelStatic } from 'sequelize';
import Teams from '../models/Team';
import Matches from '../models/Matches';
import LeaderBoard from '../models/Learderborad';
import ITeamPerformance from '../interfaces/teamPerformance';

export default class LeaderBoardService {
  constructor(
    private team: ModelStatic<Teams>,
    private macthes: ModelStatic<Matches>,
  ) {
    this.team = team;
    this.macthes = macthes;
  }

  public async getHomeMatchs(): Promise<ITeamPerformance[]> {
    const teams = await this.team.findAll();
    const matches = await this.macthes.findAll();
    return teams.map((teamIndex) => new LeaderBoard(teamIndex, matches, 'homeTeamId'));
  }
}
