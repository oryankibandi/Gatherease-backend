import { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';

export default function routeSetup(app: Application) {
  app.use(morgan('combined'));
  app.use(helmet());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req: Request, res: Response) => res.status(200).json({ message: 'Welcome to GatherEase API' }));
  app.get('/api/v1', (req: Request, res: Response) =>
    res.status(200).json({ message: 'Welcome to GatherEase API v1' })
  );
}