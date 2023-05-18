import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import MongoDb from './db/mongo';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || '1234';
const authRoutes = require('./routes/auth-routes');
export const mongoClass = new MongoDb();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.use('/api/auth', authRoutes);

mongoClass.connect();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
