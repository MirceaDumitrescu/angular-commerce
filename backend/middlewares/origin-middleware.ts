import { sendResponse } from '../controllers/utility-controller';

const originURL = 'http://accepted-url.com';

export const validateOriginMiddleware = (req: any, res: any, next: any) => {
  const origin = req.get('origin');

  try {
    if (origin && origin != originURL) throw new Error('Forbidden origin');
    next();
  } catch (error) {
    return sendResponse(res, 403, { statusText: 'Forbidden', message: `${error}` });
  }
};
