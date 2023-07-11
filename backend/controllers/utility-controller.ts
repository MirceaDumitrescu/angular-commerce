import * as jwt from 'jsonwebtoken';

interface IResponse {
  statusText: string;
  error?: string;
  message?: string;
  token?: string;
  data?: any;
}

export const sendResponse = (res: any, statusCode: number, options: IResponse) => {
  return res.status(statusCode).json(options);
};

export const signJwt = (user: any) => {
  const sessionTime = process.env.SESSION_DURATION;
  const secretKey = process.env.SECRET_KEY;
  const tokenData = {
    _id: user.id,
    role: user.role,
  };
  return jwt.sign(tokenData, secretKey!, { expiresIn: sessionTime });
};
