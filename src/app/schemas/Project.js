import mongoose, { Schema } from 'mongoose';
import { encrypt } from '../../utils/crypt';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    volunteers: [
      {
        type: Object,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

ProjectSchema.pre('save', async function save(done) {
  if (this.isModified('password_hash')) {
    this.password_hash = await encrypt(this.password_hash, 10);
  }
  done();
});

const Project = mongoose.model('User', ProjectSchema);

Project.init().then(() => {
  // eslint-disable-next-line no-console
  console.info("ProjectSchema: it's safe now");
});

export default Project;
