import IMatch from './match.interface';
import ITeam from './team.interface';

export default interface ITeamPerformance {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  matches?: IMatch[];
  team?: ITeam;
}
