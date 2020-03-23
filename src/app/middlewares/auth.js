import { promisify } from 'util';

import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.orgId = decoded.id;
    req.orgEmail = decoded.email;
    req.orgState = decoded.state;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token is invalid.' });
  }
};
