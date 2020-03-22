import mongoose, { Schema } from 'mongoose';
import { encrypt } from '../../utils/crypt';

const OrgSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password_hash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OrgSchema.pre('save', async function save(done) {
  if (this.isModified('password_hash')) {
    this.password_hash = await encrypt(this.password_hash, 10);
  }
  done();
});

const Org = mongoose.model('Org', OrgSchema);

Org.init().then(() => {
  // eslint-disable-next-line no-console
  console.info("OrgSchema: it's safe now");
});

export default Org;
