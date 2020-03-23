import { Router } from 'express';

import SubscriptionController from '../app/controllers/SubscriptionController';
import SubscriptionValidator from '../app/validators/Subscription';

const routes = new Router();

routes.get('/:volunteerEmail?', SubscriptionController.show);
routes.post(
  '/:volunteerEmail?',
  SubscriptionValidator,
  SubscriptionController.store
);

export default routes;
