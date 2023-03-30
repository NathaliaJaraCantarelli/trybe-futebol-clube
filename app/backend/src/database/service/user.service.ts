import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import ILogin from '../interfaces/login.interface';
import modelUser from '../models/User';

interface IUser extends ILogin {
  role: string;
}

export default class ServiceUser {
  constructor(private user: ModelStatic<modelUser>) {
    this.user = user;
  }

  async verifyLogin(user: ILogin): Promise<IUser | null> {
    const { email, password } = user;
    const result = await this.user.findOne({ where: { email } });
    if (!result || (password.length < 6)) return null;
    const passwordCompare = await bcrypt.compare(password, result.password);
    if (!passwordCompare) return null;
    return result;
  }
}
