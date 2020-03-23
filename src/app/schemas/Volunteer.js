import mongoose, { Schema } from 'mongoose';

const VolunteerSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

Volunteer.init().then(() => {
  // eslint-disable-next-line no-console
  console.info("VolunteerSchema: it's safe now");
});

export default Volunteer;
