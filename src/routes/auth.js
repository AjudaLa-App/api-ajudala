import { Router } from 'express';

import SessionController from '../app/controllers/SessionController';
import StoreValidator from '../app/validators/Session';

const routes = new Router();

routes.post('/session', StoreValidator, SessionController.store);

export default routes;
