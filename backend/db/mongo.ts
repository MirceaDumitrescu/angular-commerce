import dotenv from 'dotenv';
import mongoose, { Model } from 'mongoose';
dotenv.config();

export default class MongoDb {
  private url = `mongodb+srv://hionel:${process.env.MONGO_PASS}@ngcommerce.dteq6vq.mongodb.net/NGcommerce?retryWrites=true&w=majority`;
  public db = mongoose.connection;
  constructor() {}

  public connect = async () => {
    try {
      mongoose.connect(this.url);
    } catch (error) {
      console.log('Error connecting to mongo:', error);
    }
  };

  public find = async (schema: any, query: {}) => {
    return await schema.findOne(query);
  };
  public update = async (schema: any, query: {}, newData: any) => {
    return await schema.updateOne(query, { $set: newData });
  };
  public delete = async (schema: any, query: {}) => {
    return await schema.deleteOne(query);
  };

  public add = async (schema: any, entryData: any) => {
    const data = new schema(entryData);
    return data.save();
  };
}
