import { ModelStatic } from 'sequelize';
import * as bcryptjs from 'bcryptjs';
import CustomError from '../Error/CustomError';
import User from '../database/models/User';
import ILoginService from '../interfaces/ILoginService';
import jwt from '../Utils/jwt';
import { ValidEmail, ValidPass } from '../Utils/validates';

export default class LoginService implements ILoginService {
  protected userModel: ModelStatic<User> = User;

  public async valid(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) throw new CustomError('Invalid email or password', '401');

    ValidEmail(email);
    ValidPass(password);

    const compare = await bcryptjs.compare(password, user.password);

    if (!compare) throw new CustomError('Invalid email or password', '401');

    const token = jwt({ username: user.username, role: user.role, email: user.email });
    return token;
  }
}
