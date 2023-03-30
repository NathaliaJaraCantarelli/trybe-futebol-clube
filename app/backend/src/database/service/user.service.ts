import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import ILogin from '../interfaces/login.interface';
import modelUser from '../models/User';

export default class ServiceUser {
  constructor(private user: ModelStatic<modelUser>) {
    this.user = user;
  }

  async verifyLogin(user: ILogin): Promise<ILogin | null> {
    const { email, password } = user;
    const result = await this.user.findOne({ where: { email } });
    if (!result || (password.length < 6)) return null;
    const passwordCompare = await bcrypt.compare(password, result.password);
    if (!passwordCompare) return null;
    return result;
  }
}
