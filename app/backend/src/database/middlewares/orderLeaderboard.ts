import ITeamPerformance from '../interfaces/teamPerformance';

function Order(
  result: ITeamPerformance[],
  name: 'goalsFavor' | 'goalsBalance' | 'totalVictories' | 'totalPoints',
): ITeamPerformance[] {
  return result.sort((a, b) => {
    if (a[name] > b[name]) return -1;
    if (a[name] < b[name]) return 1;
    return 0;
  });
}

export default function orderTeams(result: ITeamPerformance[]): ITeamPerformance[] {
  const first = Order(result, 'goalsFavor');
  const second = Order(first, 'goalsBalance');
  const third = Order(second, 'totalVictories');
  const fourth = Order(third, 'totalPoints');
  return fourth;
}
