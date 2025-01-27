import {jest} from '@jest/globals'
import mongoose from 'mongoose';

beforeAll(async () => {
  // set up connection to mongodb
  console.debug(`Connecting to ${process.env.DB_URI}`);
  await mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});
  // mock apollo pub sub
  jest.unstable_mockModule("#lib/apolloPubSub.mjs", () => {
    return import('#mocks/lib/apolloPubSub.mjs');
  });
  await import("#lib/apolloPubSub.mjs");
  // console.log("pubsub", pubsub);
});

afterAll(async () => {
  await mongoose.disconnect();
});