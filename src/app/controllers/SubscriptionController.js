import Project from '../schemas/Project';
import Subscription from '../schemas/Subscription';
import Volunteer from '../schemas/Volunteer';

class SubscriptionController {
  async index(req, res) {
    const { orgId } = req;

    const result = await Subscription.find({
      orgId,
    }).populate({
      path: 'volunteer',
    });

    /**
     * TO DO: otimizar busca
     */
    const arrayOfAll = result.map(el => String(el.volunteerId));

    const uniqueIdVolunteers = [...new Set(arrayOfAll)];

    const volunteerData = uniqueIdVolunteers.map(id => {
      const data = result.find(el => String(el.volunteerId) === id);
      return data.volunteer;
    });

    return res.json(volunteerData);
  }

  async show(req, res) {
    const { volunteerEmail } = req.params;

    const existsVolunteer = await Volunteer.findOne({
      email: volunteerEmail,
    });

    if (!existsVolunteer)
      return res
        .status(404)
        .json({ message: 'There is not a data for this email.' });

    const projects = await Subscription.find({
      // eslint-disable-next-line no-underscore-dangle
      volunteerId: existsVolunteer._id,
    })
      .select('-__v')
      .populate({
        path: 'org',
        select: '-password_hash -createdAt -updatedAt -__v',
      })
      .populate({
        path: 'project',
        select: '-createdAt -updatedAt -__v',
      });

    return res.json({
      volunteer: {
        name: existsVolunteer.name,
        email: existsVolunteer.email,
        phone: existsVolunteer.phone,
      },
      projects,
    });
  }

  async store(req, res) {
    const { name, email, phone } = req.body;
    const { projectId } = req.params;

    const { _id: volunteerId } = await Volunteer.findOneAndUpdate(
      { email },
      { name, email, phone },
      { upsert: true, new: true }
    );

    const { orgId } = await Project.findById(projectId);

    const alreadyExist = await Subscription.findOne({
      volunteerId,
      projectId,
    });

    if (alreadyExist)
      return res.status(409).json({ error: 'Duplicate subscription' });

    const { id } = await Subscription.create({
      orgId,
      projectId,
      volunteerId,
    });

    return res.json({
      id,
    });
  }

  async update(req, res) {
    const { projectId } = req.params;

    const { name, address, description } = req.body;

    const result = await Project.findByIdAndUpdate(projectId, {
      name,
      address,
      description,
    });

    return res.json(result);
  }
}

export default new SubscriptionController();
