import ITeamPerformance from '../interfaces/teamPerformance';

export default function totalPerformance(Home: ITeamPerformance[], Away: ITeamPerformance[]) {
  return Home.map((h) => {
    const a: ITeamPerformance[] = Away
      .filter((awayTeam) => awayTeam.name === h.name);
    const total = {
      name: h.name,
      totalPoints: a[0].totalPoints + h.totalPoints,
      totalGames: a[0].totalGames + h.totalGames,
      totalVictories: a[0].totalVictories + h.totalVictories,
      totalDraws: a[0].totalDraws + h.totalDraws,
      totalLosses: a[0].totalLosses + h.totalLosses,
      goalsFavor: a[0].goalsFavor + h.goalsFavor,
      goalsOwn: a[0].goalsOwn + h.goalsOwn,
      goalsBalance: a[0].goalsFavor + h.goalsFavor - (a[0].goalsOwn + h.goalsOwn),
      efficiency: 100,
    };
    total.efficiency = Number(((total.totalPoints / (total.totalGames * 3)) * 100).toFixed(2));
    return total;
  });
}
