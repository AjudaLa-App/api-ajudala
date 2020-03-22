import Org from '../schemas/Org';

class OrgController {
  async store(req, res) {
    const { email, name, password: password_hash } = req.body;
    const orgExists = await Org.findOne({
      email,
    });
    if (orgExists) {
      return res.status(409).json({ error: 'Org already exists.' });
    }
    const { id } = await Org.create({
      email,
      name,
      password_hash,
    });
    return res.json({
      id,
      name,
      email,
    });
  }

  async update() {
    // const schema = Yup.object().shape({
    //   name: Yup.string(),
    //   email: Yup.string().email(),
    //   oldPassword: Yup.string().min(6),
    //   password: Yup.string()
    //     .min(6)
    //     .when('oldPassword', (oldPassword, field) => {
    //       oldPassword ? field.required() : field;
    //     }),
    //   confirmPassword: Yup.string().when('password', (password, field) => {
    //     password ? field.required().oneOf([Yup.ref('password')]) : field;
    //   }),
    // });
    // if (!(await schema.isValid(req.body))) {
    //   return res.status(400).json({ error: 'validation fails' });
    // }
    // const { email, oldPassword } = req.body;
    // const Org = await Org.findByPk(req.OrgId);
    // if (email !== Org.email) {
    //   const OrgExists = await Org.findOne({ where: { email } });
    // }
    // if (OrgExists) {
    //   return res.status(400).json({ error: 'Org already exists' });
    // }
    // if (oldPassword && !(await Org.checkPassword(oldPassword))) {
    //   return res.status(401).json({ error: 'password does not exists' });
    // }
    // const { id, name, provider } = await Org.update(req.body);
    // return res.json({
    //   id,
    //   name,
    //   provider,
    // });
  }
}

export default new OrgController();
