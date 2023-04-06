import { ModelStatic } from 'sequelize';
import Teams from '../models/Team';
import Matches from '../models/Matches';
import LeaderBoard from '../models/Learderborad';
import ITeamPerformance from '../interfaces/teamPerformance';
import Order from '../middlewares/orderLeaderboard';

function orderTeams(result: ITeamPerformance[]): ITeamPerformance[] {
  const first = Order(result, 'goalsFavor');
  const second = Order(first, 'goalsBalance');
  const third = Order(second, 'totalVictories');
  const fourth = Order(third, 'totalPoints');
  return fourth;
}

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
    const perfomance = teams.map((teamIndex) => new LeaderBoard(teamIndex, matches, 'homeTeamId'));
    const result = orderTeams(perfomance);
    return result;
  }

  public async getAwayMatchs(): Promise<ITeamPerformance[]> {
    const teams = await this.team.findAll();
    const matches = await this.macthes.findAll();
    const perfomance = teams.map((teamIndex) => new LeaderBoard(teamIndex, matches, 'awayTeamId'));
    const result = orderTeams(perfomance);
    return result;
  }
}
