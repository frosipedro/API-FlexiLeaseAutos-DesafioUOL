import { request, response } from 'express';
import { CarService } from '../services/car.service';
import { CarMiddleware } from '../middlewares/car.middleware';

export class CarController {
  private carService: CarService;
  private carMiddleware: CarMiddleware;

  constructor() {
    this.carService = new CarService();
  }

  public createCar = async (req: request, res: response): Promise<response> => {
    try {
      const verifyCar = await this.carMiddleware.createCar(req.body);
      if (verifyCar) {
        return res.status(400).json(verifyCar);
      }
      const car = await this.carService.createCar(req.body);
      res.status(201).json({ car });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  public getCars = async (req: request, res: response): Promise<response> => {
    try {
      const { query, page, limit } = req.query;
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

      const cars = await this.carService.getCars(
        query,
        pageNumber,
        limitNumber
      );
      res.status(200).json({ cars });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  public deleteCar = async (req: request, res: response): Promise<response> => {
    try {
      const id = req.params.id;
      const verifyId = await this.carMiddleware.deleteCar(id);
      if (verifyId) {
        return res.status(404).json(verifyId);
      }

      await this.carService.deleteCar(id);
      res.status(204).json({ message: '' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  public updateCar = async (req: request, res: response): Promise<response> => {
    try {
      const id = req.params.id;
      const verifyData = await this.carMiddleware.updateCar(id, req.body);
      if (verifyData === 'Car not found') {
        res.status(404).json(verifyData);
      }
      if (verifyData) {
        res.status(400).json(verifyData);
      }
      const car = await this.carService.updateCar(id, req.body);
      res.status(200).json({ car });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  public getCarById = async (
    req: request,
    res: response
  ): Promise<response> => {
    try {
      const id = req.params.id;
      const verifyId = await this.carMiddleware.getCarById(id);
      if (verifyId) {
        return res.status(404).json(verifyId);
      }

      const car = await this.carService.getCarById(id);
      res.status(200).json({ car });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  public updateCarAcessory = async (
    req: request,
    res: response
  ): Promise<response> => {
    try {
      const carId = req.params.id;
      const acessoryId = req.params.id;
      const car = await this.carService.updateCarAcessory(carId, acessoryId);
      res.status(200).json({ car });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
