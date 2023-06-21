/* eslint-disable @typescript-eslint/no-var-requires */
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import MongoDb from './db/mongo';
import { validateJWT, validateMidllewareJWT } from './controllers/validate-controller';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || '1234';

const authRoutes = require('./routes/auth-routes');
const productRoutes = require('./routes/product-routes');
const orderRoutes = require('./routes/order-routes');
const cors = require('cors')

export const mongoClass = new MongoDb();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/api/auth', authRoutes);
app.use('/api/products', validateMidllewareJWT, productRoutes);
app.use('/api/checkout', validateMidllewareJWT, orderRoutes);

app.get('/api/validate', validateJWT);

mongoClass.connect();
mongoClass.db.on('error', console.error.bind(console, 'connection error:'));
mongoClass.db.once('open', () => {
  console.log('MongoDB Connected...');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
