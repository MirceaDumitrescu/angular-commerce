import { Request, Response } from 'express';
import { UserSchema } from '../models/userSchema';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const authDb = require('../db/auth');

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
  const emailExists = await authDb.findAccount(registrationData.email);
  if (emailExists) {
    return res.status(409).json({
      status: 'Conflict',
      msg: 'Email already in use!',
    });
  }

  // const emailExists = await UserSchema.find({
  //   email: registrationData.email,
  // });
  // if (emailExists) {
  //   return res.status(409).json({
  //     status: 'Conflict',
  //     msg: 'Email already in use!',
  //   });
  // }

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

const loginAccount = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'Logged in',
  });
};

const getUserData = async (req: Request, res: Response) => {
  const userID = req.params;
  if (!userID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  try {
    const userData = await authDb.getAccountData(userID);
    if (!userData) {
      return res.status(404).json({
        status: 'Not found!',
        msg: `No user data associated with the user's ID`,
      });
    }
    return res.status(200).json({
      status: 'Success',
      msg: 'Got account data!',
      data: userData,
    });
  } catch (error) {
    res.status(412).json({
      status: `Wrong ID format provided`,
      msg: `${error}`,
    });
  }
};

const updateUserData = async (req: Request, res: Response) => {
  const userID = req.params;
  const newUserData = req.body;
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
    const updateDataAction = await authDb.updateAccountData(userID, newUserData);
    console.log(updateDataAction);
    if (!updateDataAction.acknowledged) {
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
  const userID = req.params;
  if (!userID) {
    return res.status(400).json({
      status: 'Bad request',
      msg: 'Request has no ID parameter!',
    });
  }
  try {
    const deleteAction = await authDb.deleteAccount(userID);
    if (!deleteAction.acknowledged) {
      return res.status(400).json({
        status: 'Failed',
        msg: 'Failed to delete account!',
      });
    }
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
