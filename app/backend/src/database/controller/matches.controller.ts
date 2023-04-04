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
}
