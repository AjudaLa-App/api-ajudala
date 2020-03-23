import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: 'Org',
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProjectSchema.virtual('org', {
  ref: 'Org',
  localField: 'orgId',
  foreignField: '_id',
  justOne: true,
});

const Project = mongoose.model('Project', ProjectSchema);

Project.init().then(() => {
  // eslint-disable-next-line no-console
  console.info("ProjectSchema: it's safe now");
});

export default Project;
