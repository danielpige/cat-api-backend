import { Response } from 'express';
import * as userService from '../services/user.service';
import { generateToken } from '../utils/jwt';
import { TypedRequestBody } from '../types/request.type';
import { LoginUser, RegisterUser } from '../interfaces/user.interface';
import { errorResponse, successResponse } from '../utils/response';

export const register = async (req: TypedRequestBody<RegisterUser>, res: Response) => {
  const data = req.body;
  try {
    const user = await userService.registerUser(data);

    const token = generateToken({ id: user._id, email: user.email, name: user.fullname });

    successResponse(res, { token, user: { id: user._id, username: user.username, email: user.email, enable: user.enable, fullname: user.fullname } });
  } catch (error: any) {
    errorResponse(res, error.message, 400);
  }
};

export const login = async (req: TypedRequestBody<LoginUser>, res: Response) => {
  const data = req.body;
  try {
    const user = await userService.loginUser(data);

    const token = generateToken({ id: user._id, email: user.email, name: user.fullname });

    successResponse(res, { token, user: { id: user._id, username: user.username, email: user.email, enable: user.enable, fullname: user.fullname } });
  } catch (error: any) {
    errorResponse(res, error.message, 403);
  }
};
