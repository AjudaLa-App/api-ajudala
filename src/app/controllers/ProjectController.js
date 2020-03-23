import Project from '../schemas/Project';

class ProjectController {
  async index(req, res) {
    const { orgId } = req;
    const { state } = req.query;

    const customQuery = state ? { state } : {};

    if (!orgId) {
      const result = await Project.find(customQuery)
        .select('-__v')
        .populate({
          path: 'org',
          select: '-password_hash -createdAt -updatedAt -__v',
        });

      return res.json(result);
    }

    const result = await Project.find({
      orgId,
    }).select('name address description');

    return res.json(result);
  }

  async store(req, res) {
    const { name, address, description } = req.body;

    const { orgId, orgState } = req;
    const { id } = await Project.create({
      orgId,
      name,
      address,
      description,
      state: orgState,
    });

    return res.json({
      id,
      name,
      address,
      description,
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

export default new ProjectController();
