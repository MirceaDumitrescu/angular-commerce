import { Collection, CollectionInfo, Db, Document, MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export default class MongoDb {
  private url = `mongodb+srv://hionel:${process.env.MONGO_PASS}@ngcommerce.dteq6vq.mongodb.net/?retryWrites=true&w=majority`;
  private client: MongoClient;
  private dbName: string = 'NGcommerce';
  public registeredUsersCollection!: Collection<Document>;
  public productsCollection!: Collection<Document>;

  constructor() {
    this.client = new MongoClient(this.url, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
  }

  public connect = async () => {
    try {
      const dbExists = await this.checkDatabaseExists(this.dbName);
      const database = this.client.db(this.dbName);

      if (!dbExists) {
        console.log('No DB found, creating DB and collections...');
        await this.checkCollections(database);
      }
      console.log('DB created, checking for collections...');
      await this.checkCollections(database);
      this.registeredUsersCollection = database.collection('users');
      this.productsCollection = database.collection('products');

      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

  private checkDatabaseExists = async (dbNameParam: string): Promise<boolean> => {
    const databases = await this.client.db().admin().listDatabases();
    return databases.databases.some((database) => database.name === dbNameParam);
  };

  private checkCollections = async (dbParam: Db): Promise<void> => {
    const collectionNames = (await dbParam.listCollections().toArray()).map(
      (collection: CollectionInfo) => collection.dbName
    );

    const collectionsToCreate: string[] = [];
    if (!collectionNames.includes('users')) {
      collectionsToCreate.push('users');
    }
    if (!collectionNames.includes('products')) {
      collectionsToCreate.push('products');
    }

    for (const collectionName of collectionsToCreate) {
      await this.createCollections(dbParam, collectionName);
    }
  };

  private createCollections = async (dbParam: Db, collectionName: string): Promise<void> => {
    const collectionExists = await dbParam.listCollections({ name: collectionName }).hasNext();
    if (!collectionExists) {
      await dbParam.createCollection(collectionName);
    }
  };
}
