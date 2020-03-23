import jwt from 'jsonwebtoken';
import Org from '../schemas/Org';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const org = await Org.findOne({ email });

    if (!org)
      return res.status(401).json({ error: 'org/password are wrongs.' });
    if (!(await org.checkPassword(password))) {
      return res.status(401).json({ error: 'org/password are wrongs.' });
    }
    const { id, name, state } = org;
    return res.json({
      org: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, email, state }, authConfig.secret, {
        expiresIn: authConfig.expires,
      }),
    });
  }
}

export default new SessionController();
