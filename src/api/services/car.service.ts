import { response } from 'express';
import Car from '../models/car.model';
import { ICar } from '../models/car.model';

interface PaginatedCars {
  cars: ICar[];
  totalCars: number;
  page: number;
  limit: number;
  offset: number;
  offsets: number;
}

export class CarService {
  public async createCar(carParams: ICar): Promise<response> {
    try {
      const car = await Car.create(carParams);
      return { car };
    } catch (error) {
      throw error;
    }
  }

  public async getCars(
    query,
    page?: number,
    limit?: number
  ): Promise<PaginatedCars> {
    try {
      const pageNumber = page ? page : 1;
      const limitNumber = limit ? limit : 10;
      const skip = (pageNumber - 1) * limitNumber;

      const searchCriteria: { [key: string]: any } = {};
      for (const key in query) {
        if (query[key]) {
          searchCriteria[key] = { $regex: query[key], $options: 'i' };
        }
      }

      const cars = await Car.find(searchCriteria).skip(skip).limit(limitNumber);
      const totalCars = await Car.countDocuments(searchCriteria);
      const offsets = Math.ceil(totalCars / limitNumber);

      return {
        cars,
        totalCars,
        page: pageNumber,
        limit: limitNumber,
        offset: skip,
        offsets,
      };
    } catch (error) {
      throw error;
    }
  }

  public async deleteCar(id: string): Promise<void> {
    try {
      await Car.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }

  public async updateCar(id: string, carParams: any): Promise<{ car: any }> {
    try {
      const car = await Car.findByIdAndUpdate(id, carParams, { new: true });
      return { car };
    } catch (error) {
      throw error;
    }
  }

  public async getCarById(id: string): Promise<{ car: any }> {
    try {
      const car = await Car.findById(id);
      return { car };
    } catch (error) {
      throw error;
    }
  }

  public async updateCarAcessory(
    carId: string,
    acessoryId: string
  ): Promise<{ car: any }> {
    try {
      const car = await Car.findByIdAndUpdate(
        carId,
        { $push: { acessories: acessoryId } },
        { new: true }
      );
      return { car };
    } catch (error) {
      throw error;
    }
  }
}
