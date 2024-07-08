import { testServer } from './jest.setup';
import { gerarCPF, gerarEmailAleatorio } from './emailAndCpfGenerator';

describe('All modules test', () => {
  let userID: string;
  let userEmail: string = gerarEmailAleatorio();
  let userCPF: string = gerarCPF();
  let userPassword: string = 'password123';
  let userToken: string;
  let carID: string;

  const userData: any = {
    name: 'John Doe',
    cpf: userCPF,
    birth: '04/21/2003',
    email: userEmail,
    password: userPassword,
    cep: '98780738',
    qualified: 'sim',
  };

  const userDataAuthenticate: any = {
    email: userEmail,
    password: userPassword,
  };

  const carData: any = {
    model: 'Uno',
    color: 'blue',
    year: 2020,
    value_per_day: 100,
    accessories: [{ description: 'air_condition' }],
    number_of_passengers: 5,
  };

  it('should create a new user', async () => {
    const user = await testServer.post('/api/v1/user').send(userData);

    expect(user.status).toBe(201);
    expect(user.body.user).toHaveProperty('_id');
  });

  it('should authenticate the user', async () => {
    const user = await testServer
      .post('/api/v1/authenticate')
      .send(userDataAuthenticate);

    expect(user.status).toBe(200);

    userToken = user.body.token;
  });

  it('should create a new car', async () => {
    const car = await testServer
      .post('/api/v1/car')
      .set('Authorization', `Bearer ${userToken}`)
      .send(carData);
    console.log(car.body);
    expect(car.status).toBe(201);
    expect(car.body.car).toHaveProperty('_id');

    carID = car.body.car._id;
  });
});
