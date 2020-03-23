import 'dotenv/config';
import express from 'express';
import path from 'path';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import routes from './routes';

import SentryInit from './config/sentry';

import 'express-async-errors';

import mongo from './loaders/mongo';

class App {
  constructor() {
    this.server = express();

    Sentry.init(SentryInit);

    this.init();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  async init() {
    this.server.use(helmet());
    this.server.use(cors());
    this.server.use(Sentry.Handlers.requestHandler());
    await mongo();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(
      rateLimit({
        windowMs: 1 * 60 * 1000,
        max: 300,
      })
    );
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV !== 'production') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error.' });
    });
  }
}

export default new App().server;
