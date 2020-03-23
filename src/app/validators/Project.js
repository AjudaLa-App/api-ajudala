/* eslint-disable no-console */
// import * as Yup from 'yup';
import { object, string } from 'yup';

class ProjectValidator {
  async store(req, res, next) {
    try {
      const schema = object().shape({
        name: string().required(),
        address: string(),
        description: string(),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      console.log('validade error err', err);
      return res.status(400).json({
        error: {
          message: 'Validation failure.',
          list: err.errors,
        },
      });
    }
  }

  async update(req, res, next) {
    try {
      const schema = object().shape({
        name: string().nullable(false),
        address: string(),
        description: string(),
      });

      await schema.validate(req.body, { abortEarly: false });

      return next();
    } catch (err) {
      console.log('validade error err', err);
      return res.status(400).json({
        error: {
          message: 'Validation failure.',
          list: err.errors,
        },
      });
    }
  }
}

export default new ProjectValidator();
