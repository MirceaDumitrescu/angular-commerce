const { MongoClient, ServerApiVersion } = require('mongodb');

export default class MongoDb {
  private uri = 'mongodb+srv://hionel:3iOtMMhv2AoijzFE@ngcommerce.yft8zvu.mongodb.net/?retryWrites=true&w=majority';
  private client = new MongoClient(this.uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  private clusterDB = this.client.db('NGcommerce');
  public mongoCollection = this.clusterDB.collection('registeredUsers');
  public run = async () => {
    this.client.connect().then((client: typeof MongoClient) => {
      client
        .db('admin')
        .command({ ping: 1 })
        .then(() => {
          console.log('MongoDB connection established');
        });
    });
  };
}
