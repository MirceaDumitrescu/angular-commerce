import jwt from 'jsonwebtoken';

export const validateMidllewareJWT = (req: any, res: any, next: any) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }
  try {
    jwt.verify(token, process.env.SECRET_KEY as string);
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token verification failed',
    });
  }
};

export const validateJWT = (req: any, res: any) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      error: 'Invalid token',
    });
  }
  try {
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY as string);
    return res.status(200).json({
      msg: 'Success!',
      userID: verifyToken,
    });
  } catch (error) {
    return res.status(401).json({
      error: 'Token verification failed',
    });
  }
};
