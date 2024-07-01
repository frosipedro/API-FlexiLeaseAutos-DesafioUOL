import { Router } from 'express';
import { CarController } from '../api/controllers/car.controller';

const carRoutes = Router();
const carController = new CarController();

carRoutes.post('/car', carController.createCar);
carRoutes.get('/car', carController.getCars);
carRoutes.delete('/car/:id', carController.deleteCar);
carRoutes.put('/car/:id', carController.updateCar);
carRoutes.get('/car/:id', carController.getCarById);
carRoutes.patch('/car/:id/acessories/:id', carController.updateCarAcessory);

export default carRoutes;
