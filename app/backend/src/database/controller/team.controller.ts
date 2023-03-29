import { Request, Response } from 'express';
import ServiceTeam from '../service/team.service';

export default class ControllerTeam {
  constructor(private team: ServiceTeam) { }

  getAll = async (_req: Request, res: Response) => {
    const result = await this.team.getAll();
    return res.status(200).json(result);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this.team.getById(Number(id));
    return res.status(200).json(result);
  };
}
