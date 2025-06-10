export interface IUser extends Document {
  _id: number
  fullname: string;
  username: string;
  email: string;
  password: string;
  enable: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type RegisterUser = Partial<IUser>;

export type LoginUser = Pick<IUser, 'username' | 'password'>;