import { IUser, LoginUser, RegisterUser } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

export const registerUser = async (user: RegisterUser): Promise<IUser> => {
  return await UserModel.create(user);
};

export const loginUser = async (userLogin: LoginUser): Promise<IUser> => {
  const { username, password } = userLogin;
  const user = await UserModel.findOne({ username });
  if (!user) throw new Error('Usuario o contraseña incorrecto.');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Usuario o contraseña incorrecto.');

  if (!user.enable) throw new Error('Usuario deshabilitado');

  return user;
};
