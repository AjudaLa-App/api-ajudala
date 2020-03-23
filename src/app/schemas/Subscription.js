import mongoose, { Schema } from 'mongoose';

const SubscriptionSchema = new Schema(
  {
    orgId: {
      type: Schema.Types.ObjectId,
      ref: 'Org',
      required: true,
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    volunteerId: {
      type: Schema.Types.ObjectId,
      ref: 'Volunteer',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

SubscriptionSchema.virtual('org', {
  ref: 'Org',
  localField: 'orgId',
  foreignField: '_id',
  justOne: true,
});
SubscriptionSchema.virtual('project', {
  ref: 'Project',
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
});
SubscriptionSchema.virtual('volunteer', {
  ref: 'Volunteer',
  localField: 'volunteerId',
  foreignField: '_id',
  justOne: true,
});

const Subscription = mongoose.model('Subscription', SubscriptionSchema);

Subscription.init().then(() => {
  // eslint-disable-next-line no-console
  console.info("SubscriptionSchema: it's safe now");
});

export default Subscription;
