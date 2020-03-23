import { Router } from 'express';

import SubscriptionController from '../app/controllers/SubscriptionController';
import ProjectController from '../app/controllers/ProjectController';
import SubscriptionValidator from '../app/validators/Subscription';

const routes = new Router();

routes.get('/', ProjectController.index);
routes.post(
  '/:projectId/volunteer',
  SubscriptionValidator,
  SubscriptionController.store
);

export default routes;
