import IRegistration from '../interfaces/IRegistration';

import { mongoClass } from '../index';

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
  const filteredData = await registerCollection.find({ email: newUserEmail }).toArray();
  if (filteredData.length >= 1) {
    return true;
  } else return false;
};

module.exports = { createAccount, findAccount };
