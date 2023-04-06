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
  goalsBalance: number;
  efficiency: number;
  team: ITeam;
  matches: IMatch[];
  typeTeam: 'homeTeamId' | 'awayTeamId';

  constructor(Team: ITeam, Matches: IMatch[], typeTeam: 'homeTeamId' | 'awayTeamId') {
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
    this.goalsBalance = this.GoalsBalance();
    this.efficiency = this.Efficiency();
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
    return this.totalDraws + this.totalLosses + this.totalVictories;
  }

  TotalPoints(): number {
    return this.totalDraws + (this.totalVictories * 3);
  }

  GoalsBalance(): number {
    return this.goalsFavor - this.goalsOwn;
  }

  Efficiency(): number {
    return Number(((this.totalPoints / (this.totalGames * 3)) * 100)
      .toFixed(2));
  }
}
