import { Request, Response } from 'express';
import IRegistration from '../interfaces/IRegistration';
import bcrypt from 'bcryptjs';
import { UserSchema } from '../models/userSchema';
import mongoose from 'mongoose';

const authDb = require('../db/auth');

const registerAccount = async (req: Request, res: Response) => {
  const registrationData = req.body;

  console.log(req.body);
  if (!registrationData) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no body data',
    });
  }
  if (
    !registrationData.email &&
    !registrationData.firstname &&
    !registrationData.lastname &&
    !registrationData.password
  ) {
    return res.status(412).json({
      status: 'Precondition failed',
      msg: 'User data is missing fields !',
    });
  }

  const emailExists = await UserSchema.findOne({
    email: registrationData.email,
  });
  if (emailExists) {
    return res.status(409).json({
      status: 'Conflict',
      msg: 'Email already in use!',
    });
  }

  const completeRegistrationData = {
    _id: new mongoose.Types.ObjectId(),
    email: registrationData.email,
    firstname: registrationData.firstname,
    lastname: registrationData.lastname,
    password: registrationData.password,
  };
  const user = new UserSchema(completeRegistrationData);
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(user.password!, salt);
  user.password = hashPassword;
  try {
    await authDb.createAccount(user);
    res.status(201).json({
      status: 'Success',
      msg: 'Created account succesfully!',
    });
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

module.exports = { registerAccount, loginAccount };
