import { CarService } from '../cars/car.service';
import { CarMiddleware } from '../cars/car.middleware';
import { Request, Response } from 'express';
import { AppErrorToJSON } from '../../utils/AppError';

export class CarController {
  private carService: CarService;
  private carMiddleware: CarMiddleware;

  constructor() {
    this.carService = new CarService();
    this.carMiddleware = new CarMiddleware();
  }

  public createCar = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.carMiddleware.createCar(req.body);

      const car = await this.carService.createCar(req.body);
      res.status(201).json(car);
    } catch (error: any) {
      res.status(error.code).json(AppErrorToJSON(error));
    }
  };

  public getCars = async (req: Request, res: Response): Promise<void> => {
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
      res.status(error.code || 400).json(AppErrorToJSON(error));
    }
  };

  public deleteCar = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.carMiddleware.deleteCar(req.params.carId);

      await this.carService.deleteCar(req.params.carId);
      res.status(204).json({ message: '' });
    } catch (error: any) {
      res.status(error.code || 400).json(AppErrorToJSON(error));
    }
  };

  public updateCar = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.carMiddleware.updateCar(req.params.carId, req.body);

      const car = await this.carService.updateCar(req.params.carId, req.body);
      res.status(200).json({ car });
    } catch (error: any) {
      res.status(error.code || 400).json(AppErrorToJSON(error));
    }
  };

  public getCarById = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.carMiddleware.getCarById(req.params.carId);

      const car = await this.carService.getCarById(req.params.carId);
      res.status(200).json({ car });
    } catch (error: any) {
      res.status(error.code || 400).json(AppErrorToJSON(error));
    }
  };

  public updateCarAccessory = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      await this.carMiddleware.updateCarAccessory(
        req.params.carId,
        req.params.accessorieId,
        req.body,
      );

      const car = await this.carService.updateCarAccessory(
        req.params.carId,
        req.params.accessorieId,
      );
      res.status(200).json({ car });
    } catch (error: any) {
      res.status(error.code || 400).json(AppErrorToJSON(error));
    }
  };
}
