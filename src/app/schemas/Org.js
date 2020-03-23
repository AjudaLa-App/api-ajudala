/* eslint-disable no-underscore-dangle */
import mongoose, { Schema } from 'mongoose';
import { encrypt, decryptAndCompareIfIsEqual } from '../../utils/crypt';

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
    cpf: {
      type: String,
      required: false,
    },
    cnpj: {
      type: String,
      required: false,
    },
    zipcode: {
      type: String,
      required: true,
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
    phone: {
      type: String,
      required: false,
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

OrgSchema.pre('updateOne', async function save(done) {
  if (this._update.oldPassword && this._update.password) {
    // console.log(' this ', this);
    this._update.password_hash = await encrypt(this._update.password, 10);
  }
  done();
});

OrgSchema.methods.checkPassword = async function checkPassword(password) {
  return decryptAndCompareIfIsEqual(password, this.password_hash);
};

const Org = mongoose.model('Org', OrgSchema);

Org.init().then(() => {
  // eslint-disable-next-line no-console
  console.info("OrgSchema: it's safe now");
});

export default Org;
