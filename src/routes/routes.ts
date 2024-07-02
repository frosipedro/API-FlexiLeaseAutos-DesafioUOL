import { Router } from 'express';
import carRoutes from './car.route';
import reserveRoutes from './reserve.route';
import userRoutes from './user.route';

const routes = Router();

routes.use('/api/v1', carRoutes);
routes.use('/api/v1', reserveRoutes);
routes.use('/api/v1', userRoutes);

export default routes;
