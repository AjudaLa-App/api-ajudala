import 'dotenv/config';
import express from 'express';
import path from 'path';
import routes from './routes';

// import './database';

import mongo from './loaders/mongo';

class App {
  constructor() {
    this.server = express();
    this.init();
    this.middlewares();
    this.routes();
  }

  async init() {
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
    this.server.use(routes);
  }
}

export default new App().server;
