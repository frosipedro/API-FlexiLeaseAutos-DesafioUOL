import { Router } from 'express';
import bookingRoutes from './car.route';
import carRoutes from './car.route';
import userRoutes from './car.route';

const routes = Router();

routes.use('/api/v1', bookingRoutes);
routes.use('/api/v1', carRoutes);
routes.use('/api/v1', userRoutes);

export default routes;
