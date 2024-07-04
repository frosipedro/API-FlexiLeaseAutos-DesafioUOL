import AppError from '../../utils/AppError';
import Car from '../cars/car.model';
import { ReserveService } from '../reserves/reserve.service';
import { ReserveMiddleware } from '../reserves/reserve.middleware';
import { Request, Response } from 'express';
import User from '../users/user.model';

export class ReserveController {
  private reserveService: ReserveService;
  private reserveMiddleware: ReserveMiddleware;

  constructor() {
    this.reserveService = new ReserveService();
    this.reserveMiddleware = new ReserveMiddleware();
  }

  public createReserve = async (req: Request, res: Response): Promise<void> => {
    try {
      const getCarData = await Car.findById(req.body.id_car);
      if (!getCarData) {
        throw new AppError(404, 'Car not found');
      }
      const getUserData = await User.findById(req.body.id_user);
      if (!getUserData) {
        throw new AppError(404, 'User not found');
      }
      await this.reserveMiddleware.createReserve(
        req.body,
        getCarData,
        getUserData,
      );

      const reserve = await this.reserveService.createReserve(req.body);
      res.status(201).json(reserve);
    } catch (error: any) {
      res.status(error.code).json({ error: error.message });
    }
  };

  public getReserves = async (req: Request, res: Response): Promise<void> => {
    try {
      const { query, page, limit } = req.query;
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

      const reserves = await this.reserveService.getReserves(
        query,
        pageNumber,
        limitNumber,
      );
      res.status(200).json({ reserves });
    } catch (error: any) {
      res.status(error.code || 400).json({ error: error.message });
    }
  };

  public getReserveById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      await this.reserveMiddleware.getReserveById(req.params.reserveId);

      const reserve = await this.reserveService.getReserveById(
        req.params.reserveId,
      );
      res.status(200).json({ reserve });
    } catch (error: any) {
      res.status(error.code || 400).json({ error: error.message });
    }
  };

  public updateReserve = async (req: Request, res: Response): Promise<void> => {
    try {
      const getCarData = await Car.findById(req.body.id_car);
      if (!getCarData) {
        throw new AppError(404, 'Car not found');
      }
      const getUserData = await User.findById(req.body.id_user);
      if (!getUserData) {
        throw new AppError(404, 'User not found');
      }
      await this.reserveMiddleware.updateReserve(
        req.params.reserveId,
        req.body,
        getCarData,
        getUserData,
      );

      const reserve = await this.reserveService.createReserve(req.body);
      res.status(201).json(reserve);
    } catch (error: any) {
      res.status(error.code).json({ error: error.message });
    }
  };

  public deleteReserve = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.reserveMiddleware.deleteReserve(req.params.reserveId);

      await this.reserveService.deleteReserve(req.params.reserveId);
      res.status(204).json({ message: '' });
    } catch (error: any) {
      res.status(error.code || 400).json({ error: error.message });
    }
  };
}
