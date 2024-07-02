import { Router } from 'express';
import { CarController } from '../api/controllers/car.controller';

const carRoutes = Router();
const carController = new CarController();

carRoutes.post('/car', carController.createCar);
carRoutes.get('/car', carController.getCars);
carRoutes.delete('/car/:carId', carController.deleteCar);
carRoutes.put('/car/:carId', carController.updateCar);
carRoutes.get('/car/:carId', carController.getCarById);
carRoutes.patch(
  '/car/:carId/acessories/:acessorieId',
  carController.updateCarAcessory,
);

export default carRoutes;
