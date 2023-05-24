import IRegistration from '../interfaces/IRegistration';

import { mongoClass } from '../index';
import { ObjectId } from 'mongodb';

const createAccount = (userData: IRegistration): Promise<any> => {
  return new Promise((resolve, reject) => {
    const registerCollection = mongoClass.registeredUsersCollection;
    registerCollection
      .insertOne(userData)
      .then((res) => resolve(res))
      .catch((error: Error) => reject(error));
  });
};

const findAccount = async (newUserEmail: string): Promise<boolean> => {
  const registerCollection = mongoClass.registeredUsersCollection;
  const filteredData = await registerCollection.findOne({ email: newUserEmail });
  if (!filteredData) {
    return false;
  }
  return false;
};

const getAccountData = async (userIdParam: string) => {
  const registerCollection = mongoClass.registeredUsersCollection;
  const userData = await registerCollection.findOne({ _id: new ObjectId(userIdParam) });
  return userData;
};

const updateAccountData = async (userIdParm: string, newData: IRegistration) => {
  const registerCollection = mongoClass.registeredUsersCollection;
  const updateObject: { $set: { [key: string]: any } } = { $set: {} };

  Object.keys(newData).forEach((key: string) => {
    updateObject.$set[key] = newData[key as keyof IRegistration];
  });

  return await registerCollection.updateOne({ _id: new ObjectId(userIdParm) }, updateObject);
};

const deleteAccount = async (userIdParam: string) => {
  const registerCollection = mongoClass.registeredUsersCollection;
  return await registerCollection.deleteOne({ _id: new ObjectId(userIdParam) });
};
const loginAccount = async (emailInput: string, password: string) => {};

module.exports = { createAccount, findAccount, loginAccount, getAccountData, updateAccountData, deleteAccount };
