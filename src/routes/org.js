import { Router } from 'express';

import OrgController from '../app/controllers/OrgController';
import OrgValidator from '../app/validators/Org';

const routes = new Router();

routes.post('/', OrgValidator, OrgController.store);

export default routes;
