/* eslint-disable no-console */
// import * as Yup from 'yup';
import { object, string } from 'yup';

export default async function store(req, res, next) {
  try {
    const schema = object().shape({
      email: string()
        .email('Must be email')
        .required(),
      password: string().required(),
      name: string().required(),
      cnpj: string(),
      cpf: string().when('cnpj', {
        is: undefined,
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
