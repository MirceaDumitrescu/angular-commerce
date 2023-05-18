import { Collection, Document, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

class MongoDb {
  private uri = `mongodb+srv://hionel:${process.env.MONGO_PASS}@ngcommerce.yft8zvu.mongodb.net/?retryWrites=true&w=majority`;
  private client;
  public registeredUsersCollection?: Collection<Document>;

  constructor() {
    this.client = new MongoClient(this.uri, {});
  }

  public connect = async () => {
    try {
      await this.client.connect();
      console.log('Connected to MongoDB');
      const db = this.client.db('NGcommerce');
      this.registeredUsersCollection = db.collection('users');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };
}

export default MongoDb;
