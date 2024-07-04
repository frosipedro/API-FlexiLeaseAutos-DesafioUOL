import mongoose from 'mongoose';
import Car from '../modules/cars/car.model';
import Reserve from '../modules/reserves/reserve.model';
import User from '../modules/users/user.model';

Car;
Reserve;
User;

export const db = mongoose;
