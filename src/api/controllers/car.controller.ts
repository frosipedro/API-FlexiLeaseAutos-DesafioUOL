import { request, response } from 'express';
import { CarService } from '../services/car.service';
import { CarMiddleware } from '../middlewares/car.middleware';

export class CarController {
  private carService: CarService;
  private carMiddleware: CarMiddleware;

  constructor() {
    this.carService = new CarService();
    this.carMiddleware = new CarMiddleware();
  }

  public createCar = async (req: typeof request, res: typeof response) => {
    try {
      await this.carMiddleware.createCar(req.body);

      const car = await this.carService.createCar(req.body);
      res.status(201).json({ car });
    } catch (error: any) {
      res.status(error.code).json({ error: error.message });
    }
  };

  public getCars = async (req: typeof request, res: typeof response) => {
    try {
      const { query, page, limit } = req.query;
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

      const cars = await this.carService.getCars(
        query,
        pageNumber,
        limitNumber,
      );
      res.status(200).json({ cars });
    } catch (error: any) {
      res.status(error.code || 400).json({ error: error.message });
    }
  };

  public deleteCar = async (req: typeof request, res: typeof response) => {
    try {
      await this.carMiddleware.deleteCar(req.params.carId);

      await this.carService.deleteCar(req.params.carId);
      res.status(204).json({ message: '' });
    } catch (error: any) {
      res.status(error.code || 400).json({ error: error.message });
    }
  };

  public updateCar = async (req: typeof request, res: typeof response) => {
    try {
      await this.carMiddleware.updateCar(req.params.carId, req.body);

      const car = await this.carService.updateCar(req.params.carId, req.body);
      res.status(200).json({ car });
    } catch (error: any) {
      res.status(error.code || 400).json({ error: error.message });
    }
  };

  public getCarById = async (req: typeof request, res: typeof response) => {
    try {
      await this.carMiddleware.getCarById(req.params.carId);

      const car = await this.carService.getCarById(req.params.carId);
      res.status(200).json({ car });
    } catch (error: any) {
      res.status(error.code || 400).json({ error: error.message });
    }
  };

  public updateCarAcessory = async (
    req: typeof request,
    res: typeof response,
  ) => {
    try {
      await this.carMiddleware.updateCarAcessory(
        req.params.carId,
        req.params.acessorieId,
        req.body,
      );

      const car = await this.carService.updateCarAcessory(
        req.params.carId,
        req.params.acessorieId,
      );
      res.status(200).json({ car });
    } catch (error: any) {
      res.status(error.code || 400).json({ error: error.message });
    }
  };
}
