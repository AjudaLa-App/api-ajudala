import express from 'express';
import routes from './routes';
import path from 'path';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }
  x;
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
