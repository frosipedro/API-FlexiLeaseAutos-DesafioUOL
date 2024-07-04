import { Router } from 'express';
import { UserController } from '../modules/users/user.controller';

const userRoutes = Router();
const userController = new UserController();

userRoutes.post('/', userController.createUser);
userRoutes.get('/', userController.getUsers);
userRoutes.delete('/:userId', userController.deleteUser);
userRoutes.put('/:userId', userController.updateUser);
userRoutes.get('/:userId', userController.getUserById);

export default userRoutes;
