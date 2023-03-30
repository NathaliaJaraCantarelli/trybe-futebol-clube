import { Request, Response, NextFunction } from 'express';
import auth from '../auth/authToken';

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  const Authorization = req.header('Authorization');
  if (!Authorization) return res.status(401).json({ message: 'Token not found' });
  const token = auth.verifyToken(Authorization);
  req.body.data = token;
  next();
};

export default { verifyAuthToken };
