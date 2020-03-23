import { Router } from 'express';
// import multer from 'multer';
// import authMiddleware from '../app/middlewares/auth';
import auth from './auth';
import org from './org';
import project from './project';
import volunteer from './volunteer';

const routes = new Router();
// const upload = multer(multerConfig);

routes.use('/auth', auth);
routes.use('/org', org);
routes.use('/project', project);
routes.use('/volunteer', volunteer);

export default routes;
