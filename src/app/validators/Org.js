/* eslint-disable no-console */

import { object, string, ref } from 'yup';

class OrgValidator {
  async store(req, res, next) {
    try {
      const schema = object().shape({
        email: string()
          .email('Must be email')
          .required(),
        password: string().required(),
        name: string().required(),
        address: string().required(),
        zipcode: string().required(),
        state: string().required(),
        city: string().required(),
        cnpj: string(),
        phone: string(),
        cpf: string().when('cnpj', {
          is: undefined || null,
          then: string()
            .strict(true)
            .required('cpf or cnpj is not null or undefined'),
        }),
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
        email: string().email('Must be email'),
        name: string(),
        address: string(),
        zipcode: string(),
        state: string(),
        city: string(),
        phone: string(),
        cnpj: string(),
        cpf: string(),
        oldPassword: string(),
        password: string().when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
        confirmPassword: string().when('password', (password, field) => {
          return password ? field.required().oneOf([ref('password')]) : field;
        }),
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

export default new OrgValidator();
