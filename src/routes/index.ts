import { Router } from 'express';
import authRoutes from './auth.route';
import authenticateUser from '../utils/authenticateUser';
import carRoutes from './car.route';
import reserveRoutes from './reserve.route';
import userRoutes from './user.route';

const routes = Router();

routes.use('/api/v1/authenticate', authRoutes);
routes.use('/api/v1/car', authenticateUser, carRoutes);
routes.use('/api/v1/reserve', authenticateUser, reserveRoutes);
routes.use('/api/v1/user', userRoutes);

export default routes;
