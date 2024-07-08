import request from 'supertest';
import app from '../app';

describe('All modules test', () => {
  let userID: string;
  let userEmail: string;
  let userPassword: string;
  let tokenUser: string;
  let carID: string;

  test('should create a new user', async () => {
    const userData: any = {
      name: 'John Doe',
      cpf: '035.554.980-88',
      birth: '04/21/2003',
      email: 'john@example.com',
      password: 'password123',
      cep: '98780738',
      qualified: 'sim',
    };

    const user = await request(app).post('/api/v1/user').send(userData);

    expect(user.status).toBe(201);
    expect(user.body.user).toHaveProperty('_id');

    userID = user.body.user._id;
    userEmail = user.body.user.email;
    userPassword = 'password123';
  });

  test('should authenticate the user', async () => {
    const user = await request(app).post('/api/v1/authenticate').send({
      email: userEmail,
      password: userPassword,
    });

    expect(user.status).toBe(200);

    tokenUser = user.body.token;
  });

  test('should create a new car', async () => {
    const car = await request(app)
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({
        model: 'Uno',
        color: 'blue',
        year: 2020,
        value_per_day: 100,
        acessories: [{ description: 'air_condition' }],
        number_of_passangers: 5,
      });

    expect(car.status).toBe(201);
    expect(car.body.car).toHaveProperty('_id');

    carID = car.body.car._id;
  });
});
