import Car from '../models/car.model';
import { ICar } from '../models/car.model';
import AppError from '../utils/AppError';

export class CarMiddleware {
  public async createCar(carData: ICar): Promise<any> {
    const requiredFields = [
      'model',
      'color',
      'year',
      'value_per_day',
      'accessories',
      'number_of_passengers',
    ];
    for (const field of requiredFields) {
      if (!carData[field]) {
        throw new AppError(400, `${field} is required`);
      }
    }

    if (carData.year < 1950 || carData.year > 2023) {
      throw new AppError(400, 'Year must be between 1950 and 2023');
    }

    if (!Array.isArray(carData.accessories) || carData.accessories.length < 1) {
      throw new AppError(400, 'At least one accessory is required');
    }

    const accessorySet = new Set(carData.accessories);
    if (accessorySet.size !== carData.accessories.length) {
      throw new AppError(400, 'Duplicate accessories are not allowed');
    }
  }

  public async deleteCar(id: any): Promise<any> {
    const findById = await Car.findById(id);
    if (!findById) {
      throw new AppError(404, 'Car not found');
    }
  }

  public async updateCar(id: any, carData: ICar) {
    const findById = await Car.findById(id);
    if (!findById) {
      throw new AppError(404, 'Car not found');
    }

    const requiredFields = [
      'model',
      'color',
      'year',
      'value_per_day',
      'accessories',
      'number_of_passengers',
    ];
    for (const field of requiredFields) {
      if (!carData[field]) {
        throw new AppError(400, `${field} is required`);
      }
    }

    if (carData.year < 1950 || carData.year > 2023) {
      throw new AppError(400, 'Year must be between 1950 and 2023');
    }

    if (!Array.isArray(carData.accessories) || carData.accessories.length < 1) {
      throw new AppError(400, 'At least one accessory is required');
    }

    const accessorySet = new Set(carData.accessories);
    if (accessorySet.size !== carData.accessories.length) {
      throw new AppError(400, 'Duplicate accessories are not allowed');
    }
  }

  public async getCarById(id: any) {
    const findById = await Car.findById(id);
    if (!findById) {
      throw new AppError(404, 'Car not found');
    }
  }

  public async updateCarAcessory(carId: any, accessory: any, body: any) {
    const findById = await Car.findById(carId);
    if (!findById) {
      throw new AppError(404, 'Car not found');
    }
    if (!body.accessory.description) {
      throw new AppError(400, 'Accessory description is required');
    }
  }
}
