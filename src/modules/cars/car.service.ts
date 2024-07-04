import AppError from '../../utils/AppError';
import Car from '../cars/car.model';
import { ICar } from '../cars/car.model';

interface PaginatedCars {
  cars: ICar[];
  totalCars: number;
  page: number;
  limit: number;
  offset: number;
  offsets: number;
}

export class CarService {
  public async createCar(carParams: ICar): Promise<ICar> {
    try {
      const car = new Car(carParams);
      await car.save();
      return car;
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async getCars(
    query: any,
    page?: number,
    limit?: number,
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
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async deleteCar(id: string): Promise<void> {
    try {
      await Car.findByIdAndDelete(id);
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async updateCar(
    id: string,
    carParams: ICar,
  ): Promise<{ car: ICar | null }> {
    try {
      const car = await Car.findByIdAndUpdate(id, carParams, {
        new: true,
      });
      return { car };
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async getCarById(id: string): Promise<{ car: ICar | null }> {
    try {
      const car = await Car.findById(id);
      return { car };
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }

  public async updateCarAcessory(
    carId: string,
    acessoryId: string,
  ): Promise<{ car: ICar | null }> {
    try {
      const car = await Car.findByIdAndUpdate(
        carId,
        { $push: { acessories: acessoryId } },
        { new: true },
      );
      return { car };
    } catch (error: any) {
      throw new AppError(400, error.message);
    }
  }
}
