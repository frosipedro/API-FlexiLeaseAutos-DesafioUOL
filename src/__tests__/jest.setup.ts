import supertest from 'supertest';
import server from '../server';
import mongoose from 'mongoose';

export const testServer = supertest(server);

afterAll(async () => {
  await mongoose.connection.close();
});
