import { Router } from 'express';

import AuthMiddleware from '../app/middlewares/auth';

import OrgController from '../app/controllers/OrgController';
import OrgValidator from '../app/validators/Org';

import ProjectController from '../app/controllers/ProjectController';
import ProjectValidator from '../app/validators/Project';

import SubscriptionController from '../app/controllers/SubscriptionController';

const routes = new Router();

routes.post('/', OrgValidator.store, OrgController.store);
routes.put('/', AuthMiddleware, OrgValidator.update, OrgController.update);

routes.get('/project', AuthMiddleware, ProjectController.index);
routes.post(
  '/project',
  AuthMiddleware,
  ProjectValidator.store,
  ProjectController.store
);
routes.put(
  '/project/:projectId',
  AuthMiddleware,
  ProjectValidator.update,
  ProjectController.update
);

routes.get('/volunteer', AuthMiddleware, SubscriptionController.index);

export default routes;
