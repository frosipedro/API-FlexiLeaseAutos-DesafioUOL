import { Router } from 'express';
import { CarController } from '../../modules/cars/car.controller';

const carRoutes = Router();
const carController = new CarController();

carRoutes.post('/', carController.createCar);
carRoutes.get('/', carController.getCars);
carRoutes.delete('/:carId', carController.deleteCar);
carRoutes.put('/:carId', carController.updateCar);
carRoutes.get('/:carId', carController.getCarById);
carRoutes.patch(
  '/:carId/accessories/:accessorieId',
  carController.updateCarAccessory,
);

export default carRoutes;
