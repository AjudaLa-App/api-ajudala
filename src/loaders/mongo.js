/* eslint-disable no-console */
import mongoose from 'mongoose';
import config from '../config/collection';

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => {
  console.log('Connection Established');
});

mongoose.connection.on('reconnected', () => {
  console.log('Connection Reestablished');
});

mongoose.connection.on('disconnected', () => {
  console.log('Connection Disconnected');
});

mongoose.connection.on('close', () => {
  console.log('Connection Closed');
});

mongoose.connection.on('error', error => {
  console.log(`ERROR: ${error}`);
});

const run = async () => {
  await mongoose.connect(
    `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  );
};

export default run;
