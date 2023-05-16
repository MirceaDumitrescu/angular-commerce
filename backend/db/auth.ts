import IRegistration from '../interfaces/IRegistration';

import Mongo from './mongo';
const mongoClass = new Mongo();
const registerCollection = mongoClass.mongoCollection;

const createAccount = (userData: IRegistration) => {
  registerCollection.insertOne(userData).then((res: any) => {
    if (res.acknowledged === true) {
      console.log('Data inserted in db', res);
    } else {
      console.log('Data failed to add to db');
    }
  });
};

module.exports = { createAccount };
