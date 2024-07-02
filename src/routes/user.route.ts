import { Router } from 'express';
import { UserController } from '../api/controllers/user.controller';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/user', userController.createUser);
userRoutes.get('/user', userController.getUsers);
userRoutes.delete('/user/:userId', userController.deleteUser);
userRoutes.put('/user/:userId', userController.updateUser);
userRoutes.get('/user/:userId', userController.getUserById);
userRoutes.post('/authenticate', userController.authenticateUser);

export default userRoutes;
