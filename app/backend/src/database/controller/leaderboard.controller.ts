import { Request, Response } from 'express';
import ServiceLeaderboard from '../service/leaderboard.service';

export default class ControllerLearderboard {
  constructor(private leaderboard: ServiceLeaderboard) {
    this.leaderboard = leaderboard;
  }

  getHome = async (req: Request, res: Response) => {
    const result = await this.leaderboard.getHomeMatchs();
    return res.status(200).json(result);
  };

  getAway = async (req: Request, res: Response) => {
    const result = await this.leaderboard.getAwayMatchs();
    return res.status(200).json(result);
  };
}
