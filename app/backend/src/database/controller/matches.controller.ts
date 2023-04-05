import { Request, Response } from 'express';
import ServiceMatches from '../service/matches.service';

export default class ControllerMatches {
  constructor(private matches: ServiceMatches) {
    this.matches = matches;
  }

  getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    let result = await this.matches.getAll();
    if (inProgress) {
      result = result.filter((match) => match.inProgress.toString() === inProgress);
    }
    return res.status(200).json(result);
  };

  finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matches.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };

  editMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matches.editMatch(homeTeamGoals, awayTeamGoals, Number(id));
    return res.status(200).json({ message: 'updated' });
  };
}
