import Car from '../models/car.model';
import { ICar } from '../models/car.model';

export class CarMiddleware {
  public async createCar(carData: ICar) {
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
        return `${field} is required`;
      }
    }

    if (carData.year < 1950 || carData.year > 2023) {
      return 'Year must be between 1950 and 2023';
    }

    if (!Array.isArray(carData.accessories) || carData.accessories.length < 1) {
      return 'At least one accessory is required';
    }

    const accessorySet = new Set(carData.accessories);
    if (accessorySet.size !== carData.accessories.length) {
      return 'Duplicate accessories are not allowed';
    }
  }

  public async deleteCar(id: any) {
    const findById = await Car.findById(id);
    if (!findById) {
      return 'Car not found';
    }
  }

  public async updateCar(id: any, carData: ICar) {
    const findById = await Car.findById(id);
    if (!findById) {
      return 'Car not found';
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
        return `${field} is required`;
      }
    }

    if (carData.year < 1950 || carData.year > 2023) {
      return 'Year must be between 1950 and 2023';
    }

    if (!Array.isArray(carData.accessories) || carData.accessories.length < 1) {
      return 'At least one accessory is required';
    }

    const accessorySet = new Set(carData.accessories);
    if (accessorySet.size !== carData.accessories.length) {
      return 'Duplicate accessories are not allowed';
    }
  }

  public async getCarById(id: any) {
    const findById = await Car.findById(id);
    if (!findById) {
      return 'Car not found';
    }
  }

  public async updateCarAcessory(carId: any, accessory: any) {
    const findById = await Car.findById(carId);
    if (!findById) {
      return 'Car not found';
    }
  }
}
