import { Router } from 'express';
import authRoutes from './modules/auth.route';
import authenticateUser from '../utils/authenticateUser';
import carRoutes from './modules/car.route';
import reserveRoutes from './modules/reserve.route';
import userRoutes from './modules/user.route';

const routes = Router();

routes.use('/api/v1/authenticate', authRoutes);
routes.use('/api/v1/car', authenticateUser, carRoutes);
routes.use('/api/v1/reserve', authenticateUser, reserveRoutes);
routes.use('/api/v1/user', userRoutes);

export default routes;
