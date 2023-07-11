import jwt from 'jsonwebtoken';
import { sendResponse } from './utility-controller';

export const validateJWT = (req: any, res: any) => {
  const token = req.headers.authorization;

  try {
    if (!token) {
      throw new Error('Invalid token');
    }

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY as string);

    return sendResponse(res, 200, { statusText: 'Ok', message: 'Token is valid!', data: verifyToken });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', message: `${error}` });
  }
};
