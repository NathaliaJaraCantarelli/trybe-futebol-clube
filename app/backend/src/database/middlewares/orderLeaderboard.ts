import ITeamPerformance from '../interfaces/teamPerformance';

export default function Order(
  result: ITeamPerformance[],
  name: 'goalsFavor' | 'goalsBalance' | 'totalVictories' | 'totalPoints',
): ITeamPerformance[] {
  return result.sort((a, b) => {
    if (a[name] > b[name]) return -1;
    if (a[name] < b[name]) return 1;
    return 0;
  });
}
