import IRegistration from '../interfaces/IRegistration';

const mongoClass = require('../index');
const registerCollection = mongoClass.registeredUsersCollection;

const createAccount = (userData: IRegistration): Promise<any> => {
  console.log(userData);
  return new Promise((resolve, reject) => {
    registerCollection
      .insertOne(userData)
      .then((res: any) => resolve(res))
      .catch((error: any) => reject(error));
  });
};

module.exports = { createAccount };
