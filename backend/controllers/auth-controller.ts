import { Request, Response } from 'express';
import { UserSchema } from '../models/userSchema';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const registerAccount = async (req: Request, res: Response) => {
  const registrationData = req.body;
  if (!registrationData) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no body data!',
    });
  }
  if (
    !registrationData.email ||
    !registrationData.firstname ||
    !registrationData.lastname ||
    !registrationData.password
  ) {
    return res.status(412).json({
      status: 'Precondition failed',
      msg: 'User data is missing fields!',
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
    await user.save();
    return res.status(201).json({
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

const loginAccount = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(412).json({
      status: 'Precondition failed',
      msg: 'One of the fields missing!',
    });
  }
  try {
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 'Not found!',
        msg: 'User email not found!',
      });
    }
    const validatePassword = await bcrypt.compare(password, user.password as string);
    if (!validatePassword) {
      return res.status(409).json({
        status: 'Conflict!',
        msg: 'Passwords do NOT match!',
      });
    }
    const sessionTime = 3600;
    const secretKey = crypto.randomBytes(32).toString('hex');
    const token = jwt.sign(
      {
        _id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        creation_date: user.creation_date,
      },
      secretKey,
      { expiresIn: sessionTime }
    );
    return res.json(token);
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Error encountered while logging in!',
    });
  }
};

const getUserData = async (req: Request, res: Response) => {
  const userID = req.params.id;
  if (!userID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  try {
    const userData = await UserSchema.findOne({ _id: userID });
    if (!userData) {
      return res.status(404).json({
        status: 'Not found!',
        msg: `No user data associated with the user's ID`,
      });
    }
    return res.status(200).json({
      status: 'Success',
      msg: 'Got account data!',
      data: {
        email: userData.email,
        firstname: userData.firstname,
        lastname: userData.lastname,
      },
    });
  } catch (error) {
    res.status(412).json({
      status: `Wrong ID format provided`,
      msg: `${error}`,
    });
  }
};

const updateUserData = async (req: Request, res: Response) => {
  const userID = req.params.id;
  const newUserData = req.body;
  const updateObject: IUser = {};
  Object.keys(newUserData).forEach((key: string) => {
    updateObject[key as keyof IUser] = newUserData[key];
  });
  if (!userID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  if (!newUserData || Object.keys(newUserData).length < 1) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no body data!',
    });
  }
  try {
    const updateResult = await UserSchema.updateOne({ _id: userID }, { $set: updateObject });
    if (!updateResult.acknowledged) {
      return res.status(404).json({
        status: 'Failed',
        msg: 'Update failed!',
      });
    }
    return res.status(200).json({
      status: 'Success',
      msg: 'Account data updated!',
    });
  } catch (error) {
    res.status(400).json({
      status: `Error encountered`,
      msg: `${error}`,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userID = req.params.id;
  if (!userID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  try {
    await UserSchema.deleteOne({ _id: userID });
    return res.status(200).json({
      status: 'Success',
      msg: 'Account deleted succesfully!',
    });
  } catch (error) {
    res.status(400).json({
      status: `Error encountered`,
      msg: `${error}`,
    });
  }
};
module.exports = { registerAccount, loginAccount, getUserData, updateUserData, deleteUser };
