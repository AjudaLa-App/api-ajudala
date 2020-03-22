import { Router } from 'express';
// import multer from 'multer';
// import authMiddleware from '../app/middlewares/auth';
import auth from './auth';
import org from './org';

const routes = new Router();
// const upload = multer(multerConfig);

routes.use('/auth', auth);
routes.use('/org', org);

export default routes;
