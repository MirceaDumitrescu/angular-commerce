import jwt from 'jsonwebtoken';
import { sendResponse } from '../controllers/utility-controller';

export const validateMidllewareJWT = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  try {
    if (!token) throw new Error('Invalid token');

    jwt.verify(token, process.env.SECRET_KEY as string);
    next();
  } catch (error) {
    return sendResponse(res, 401, { statusText: 'Forbidden', message: `${error}` });
  }
};

export const validatePermissionJWT = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;

  try {
    if (!token) throw new Error('Invalid token');

    const decodedJwt = jwt.verify(token, process.env.SECRET_KEY as string);
    const role = typeof decodedJwt === 'object' ? decodedJwt.role : null;

    if (role !== 'admin') throw new Error('Permission forbidden');

    next();
  } catch (error) {
    return sendResponse(res, 401, { statusText: 'Forbidden', message: `${error}` });
  }
};
