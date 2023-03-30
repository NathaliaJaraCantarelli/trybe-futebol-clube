import { sign, verify } from 'jsonwebtoken';
import ILogin from '../interfaces/login.interface';

interface IUser extends ILogin {
  role: string;
}

const secret = process.env.JWT_SECRET || 'secret';

const generateToken = (login: IUser) => {
  const token = sign(login, secret, {
    expiresIn: '15min',
    algorithm: 'HS256',
  });
  return token;
};

const verifyToken = (token: string) => verify(token, secret);

export default { generateToken, verifyToken };
