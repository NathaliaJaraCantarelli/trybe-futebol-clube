import { Request, Response } from 'express';
import ServiceTeam from '../service/team.service';

export default class ControllerTeam {
  constructor(private team: ServiceTeam) { }

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await this.team.getAll();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  };
}
