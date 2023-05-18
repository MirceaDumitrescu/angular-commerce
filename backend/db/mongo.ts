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
        const collectionsExists = await this.checkCollections(database);
        if (!collectionsExists) {
          this.createCollections(database);
        }
      }
      this.registeredUsersCollection = database.collection('users');
      this.productsCollection = database.collection('products');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

  private checkDatabaseExists = async (dbNameParam: string): Promise<boolean> => {
    const databases = await this.client.db().admin().listDatabases();
    return databases.databases.some((database) => database.name === dbNameParam);
  };

  private checkCollections = async (dbParam: Db): Promise<boolean> => {
    const collections: CollectionInfo[] = await dbParam.listCollections().toArray();
    const collectionNames: string[] = collections.map((collection: CollectionInfo) => collection.dbName);
    return collectionNames.includes('users') && collectionNames.includes('products');
  };

  private createCollections = async (dbParam: Db): Promise<void> => {
    await dbParam.createCollection('users');
    await dbParam.createCollection('products');
  };
}
