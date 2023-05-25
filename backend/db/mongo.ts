import { Collection, CollectionInfo, Db, Document, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
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
}
