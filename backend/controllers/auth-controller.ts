import { Request, Response } from 'express';
import IRegistration from '../interfaces/IRegistration';

const authDb = require('../db/auth');

const registerAccount = async (req: Request, res: Response) => {
  try {
    const registrationData = req.body;
    if (isInstanceOfRegistration(registrationData)) {
      authDb.createAccount(registrationData);
      res.status(201).json({
        status: 'Success',
        msg: 'Created account succesfully!',
        data: registrationData,
      });
    } else {
      res.status(412).json({
        status: 'Failed',
        msg: 'User data is not an instance of IRegistration interface',
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'Request failed ',
      msg: `${error}`,
    });
  }
};

const loginAccount = (req: any, res: any) => {
  res.status(200).json({
    status: 'Logged in',
  });
};

const isInstanceOfRegistration = (userData: any): userData is IRegistration => {
  return 'email' in userData && 'firstname' in userData && 'lastname' in userData && 'password' in userData;
};

module.exports = { registerAccount, loginAccount };
