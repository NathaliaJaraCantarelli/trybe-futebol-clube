import { ModelStatic } from 'sequelize';
import Teams from '../models/Team';
import Matches from '../models/Matches';
import LeaderBoard from '../models/Learderborad';
import ITeamPerformance from '../interfaces/teamPerformance';
import Order from '../middlewares/orderLeaderboard';

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
    const result = teams.map((teamIndex) => new LeaderBoard(teamIndex, matches, 'homeTeamId'));
    const first = Order(result, 'goalsFavor');
    const second = Order(first, 'goalsBalance');
    const thirt = Order(second, 'totalVictories');
    const fourty = Order(thirt, 'totalPoints');
    return fourty;
  }
}
