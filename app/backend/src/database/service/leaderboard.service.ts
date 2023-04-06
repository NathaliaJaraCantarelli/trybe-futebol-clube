import { ModelStatic } from 'sequelize';
import Teams from '../models/Team';
import Matches from '../models/Matches';
import LeaderBoard from '../models/Learderborad';
import ITeamPerformance from '../interfaces/teamPerformance';
import orderTeams from '../middlewares/orderLeaderboard';
import totalPerformance from '../middlewares/totalPerformance';

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

  public async getAllMatchs(): Promise<ITeamPerformance[]> {
    const teams = await this.team.findAll();
    const matches = await this.macthes.findAll();
    const Home = teams.map((teamIndex) => new LeaderBoard(teamIndex, matches, 'homeTeamId'));
    const Away = teams.map((teamIndex) => new LeaderBoard(teamIndex, matches, 'awayTeamId'));
    const perfomance = totalPerformance(Home, Away);
    const result = orderTeams(perfomance);
    return result;
  }
}
