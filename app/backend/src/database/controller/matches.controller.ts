import { Request, Response } from 'express';
import ServiceMatches from '../service/matches.service';

export default class ControllerMatches {
  constructor(private matches: ServiceMatches) {
    this.matches = matches;
  }

  getAll = async (_req: Request, res: Response) => {
    const result = await this.matches.getAll();
    return res.status(200).json(result);
  };
}
