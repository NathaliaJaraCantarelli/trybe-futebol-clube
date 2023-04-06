import IMatch from '../interfaces/match.interface';
import ITeam from '../interfaces/team.interface';
import ITeamPerformance from '../interfaces/teamPerformance';

export default class LeaderBoard implements ITeamPerformance {
  name: string;
  totalGames: number;
  totalPoints: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  team: ITeam;
  matches: IMatch[];
  typeTeam: 'homeTeamId';

  constructor(Team: ITeam, Matches: IMatch[], typeTeam: 'homeTeamId') {
    this.team = Team;
    this.typeTeam = typeTeam;
    this.name = Team.teamName;
    this.matches = Matches;
    this.totalVictories = this.TotalVictories();
    this.totalLosses = this.TotalLosses();
    this.totalDraws = this.TotalDraws();
    this.totalPoints = this.TotalPoints();
    this.goalsFavor = this.GoalsFavor();
    this.goalsOwn = this.GoalsOwn();
    this.totalGames = this.TotalGames();
  }

  GoalsFavor(): number {
    const goalsFav = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id && !cur.inProgress) return acc + cur.homeTeamGoals;
      return acc;
    }, 0);
    return goalsFav;
  }

  GoalsOwn(): number {
    const goalsOw = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id && !cur.inProgress) return acc + cur.awayTeamGoals;
      return acc;
    }, 0);
    return goalsOw;
  }

  TotalVictories(): number {
    const victories = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id
        && !cur.inProgress
        && cur.homeTeamGoals > cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return victories;
  }

  TotalDraws(): number {
    const draws = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id
        && !cur.inProgress
        && cur.homeTeamGoals === cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return draws;
  }

  TotalLosses(): number {
    const losses = this.matches.reduce((acc, cur) => {
      if (cur[this.typeTeam] === this.team.id
        && !cur.inProgress
        && cur.homeTeamGoals < cur.awayTeamGoals) return acc + 1;
      return acc;
    }, 0);
    return losses;
  }

  TotalGames(): number {
    const games = this.totalDraws + this.totalLosses + this.totalVictories;
    return games;
  }

  TotalPoints(): number {
    const points = this.totalDraws + (this.totalVictories * 3);
    return points;
  }
}
