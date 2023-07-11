import { Request, Response } from 'express';
import { sendResponse, signJwt } from './utility-controller';

import mongoose from 'mongoose';
import { UserSchema } from '../models/userSchema';
import { mongoClass } from '..';

import IUser from '../interfaces/IUser';

import bcrypt from 'bcryptjs';

const registerAccount = async (req: Request, res: Response) => {
  const registrationData = req.body;
  try {
    if (!registrationData) throw new Error('Request has no body data!');
    if (
      !registrationData.email ||
      !registrationData.firstname ||
      !registrationData.lastname ||
      !registrationData.password
    ) {
      throw new Error('User data is missing fields!');
    }
    const emailExists = await mongoClass.find(UserSchema, registrationData.email);

    if (emailExists) throw new Error('Email already in use!');

    const completeRegistrationData = {
      _id: new mongoose.Types.ObjectId(),
      ...registrationData,
    };
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(completeRegistrationData.password!, salt);
    completeRegistrationData.password = hashPassword;
    await mongoClass.add(UserSchema, completeRegistrationData);
    return sendResponse(res, 201, { statusText: 'Created', message: 'Created account succesfully!' });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', error: `${error}` });
  }
};

const loginAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error('One of the fields missing!');
    const user = await mongoClass.find(UserSchema, { email: email });
    if (!user) throw new Error('User email not found!');
    const validatePassword = await bcrypt.compare(password, user.password as string);
    if (!validatePassword) throw new Error('Passwords do NOT match!');

    const token = signJwt(user);
    return sendResponse(res, 200, {
      statusText: 'Ok',
      message: 'Login Succesfull!',
      token: token,
      data: {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request', error: `${error}` });
  }
};

const getUserData = async (req: Request, res: Response) => {
  const userID = req.params.id;

  try {
    if (!userID) throw new Error('Request has no ID parameter!!');

    const userData = await mongoClass.find(UserSchema, { _id: userID });
    if (!userData) throw new Error(`No user data associated with the user's ID`);

    return sendResponse(res, 200, {
      statusText: 'OK',
      message: `Got account data!`,
      data: {
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
      },
    });
  } catch (error) {
    return sendResponse(res, 412, { statusText: 'Not found!', error: `${error}` });
  }
};

const updateUserData = async (req: Request, res: Response) => {
  const userID = req.params.id;
  const newUserData = req.body;
  const updateObject = {} as IUser;

  Object.keys(newUserData).forEach((key: string) => {
    updateObject[key as keyof IUser] = newUserData[key];
  });

  try {
    if (!userID) {
      throw new Error('Request has no ID parameter!');
    }

    if (!newUserData || Object.keys(newUserData).length < 1) {
      throw new Error('Request has no body data!');
    }

    const updateResult = await mongoClass.update(UserSchema, { _id: userID }, updateObject);

    if (!updateResult.acknowledged) {
      throw new Error('Update failed!');
    }

    return sendResponse(res, 200, { statusText: 'Ok!', message: 'Account data updated!' });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request!', error: `${error}` });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userID = req.params.id;

  try {
    if (!userID) throw new Error(`Request has no ID parameter!`);

    await mongoClass.delete(UserSchema, { _id: userID });
    return sendResponse(res, 200, { statusText: 'Ok!', message: `Account deleted succesfully!` });
  } catch (error) {
    return sendResponse(res, 400, { statusText: 'Bad request!', error: `${error}` });
  }
};
module.exports = { registerAccount, loginAccount, getUserData, updateUserData, deleteUser };
