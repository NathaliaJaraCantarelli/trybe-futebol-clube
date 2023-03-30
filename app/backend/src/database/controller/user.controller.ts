import { Request, Response } from 'express';
import authToken from '../auth/authToken';
import ServiceUser from '../service/user.service';

export default class ControllerUser {
  constructor(private user: ServiceUser) { }

  verifyLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await this.user.verifyLogin({ email, password });
    if (!result) return res.status(401).json({ message: 'Invalid email or password' });
    const token = authToken.generateToken({ email, password, role: result.role });
    return res.status(200).json({ token });
  };

  roleToken = async (req: Request, res: Response) => {
    const user = req.body.data;
    res.status(200).json(user);
  };
}
