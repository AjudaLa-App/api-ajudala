import Org from '../schemas/Org';
import { removeUndefinedFields } from '../../utils/object';

class OrgController {
  async store(req, res) {
    const {
      email,
      name,
      password: password_hash,
      cpf,
      cpnj,
      zipcode,
      address,
      state,
      city,
      phone,
    } = req.body;
    const orgExists = await Org.findOne({
      email,
    });
    if (orgExists) {
      if (orgExists.name === name && orgExists.zipcode === zipcode)
        return res.status(409).json({ error: 'Org already exists.' });
      return res.status(409).json({ error: 'This email is not available' });
    }
    const { id } = await Org.create({
      email,
      name,
      password_hash,
      cpf,
      cpnj,
      zipcode,
      address,
      state,
      city,
      phone,
    });

    return res.json({
      ...req.body,
      id,
    });
  }

  async update(req, res) {
    const {
      email,
      oldPassword,
      confirmPassword,
      password,
      name,
      address,
      zipcode,
      state,
      city,
      phone,
      cpf,
      cnpj,
    } = req.body;

    const obj = {
      email,
      oldPassword,
      confirmPassword,
      password,
      name,
      address,
      zipcode,
      state,
      city,
      phone,
      cpf,
      cnpj,
    };

    const org = await Org.findById(req.orgId);
    // console.log('org', org);
    // console.log('orgId', req.orgId);
    if (email !== org.email) {
      const orgExists = await Org.findOne({ where: { email } });
      if (orgExists)
        return res.status(409).json({ error: 'This email is not available.' });
    }

    if (oldPassword && !(await org.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password is wrong.' });
    }
    const newBody = removeUndefinedFields(obj);

    const { id } = await org.updateOne(newBody);
    return res.json({
      id,
      ...obj,
    });
  }
}

export default new OrgController();
