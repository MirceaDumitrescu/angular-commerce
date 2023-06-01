import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import MongoDb from './db/mongo';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || '1234';
const authRoutes = require('./routes/auth-routes');
const productRoutes = require('./routes/product-routes');
export const mongoClass = new MongoDb();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

mongoClass.connect();
mongoClass.db.on('error', console.error.bind(console, 'connection error:'));
mongoClass.db.once('open', () => {
  console.log('MongoDB Connected...');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
