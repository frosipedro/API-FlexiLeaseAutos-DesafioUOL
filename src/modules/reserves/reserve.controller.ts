import { CarMiddleware } from '../cars/car.middleware';
import { CarService } from '../cars/car.service';
import { ReserveService } from '../reserves/reserve.service';
import { ReserveMiddleware } from '../reserves/reserve.middleware';
import { Request, Response } from 'express';
import { UserMiddleware } from '../users/user.middleware';
import { UserService } from '../users/user.service';
import { AppErrorToJSON } from '../../utils/AppError';

export class ReserveController {
  private carService: CarService;
  private carMiddleware: CarMiddleware;
  private reserveService: ReserveService;
  private reserveMiddleware: ReserveMiddleware;
  private userService: UserService;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.carService = new CarService();
    this.carMiddleware = new CarMiddleware();
    this.reserveService = new ReserveService();
    this.reserveMiddleware = new ReserveMiddleware();
    this.userService = new UserService();
    this.userMiddleware = new UserMiddleware();
  }

  public createReserve = async (req: Request, res: Response): Promise<void> => {
    try {
      let getCarData = req.body.id_car;
      await this.carMiddleware.getCarById(getCarData);
      getCarData = await this.carService.getCarById(req.body.id_car);

      let getUserData = req.body.id_user;
      await this.userMiddleware.getUserById(getUserData);
      getUserData = await this.userService.getUserById(req.body.id_user);

      await this.reserveMiddleware.createReserve(
        req.body,
        getCarData,
        getUserData,
      );

      const reserve = await this.reserveService.createReserve(req.body);
      res.status(201).json(reserve);
    } catch (error: any) {
      console.log(error);
      res.status(error.code).json(AppErrorToJSON(error));
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
      res.status(error.code || 400).json(AppErrorToJSON(error));
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
      res.status(error.code || 400).json(AppErrorToJSON(error));
    }
  };

  public updateReserve = async (req: Request, res: Response): Promise<void> => {
    try {
      let getCarData = req.body.id_car;
      await this.carMiddleware.getCarById(getCarData);
      getCarData = await this.carService.getCarById(req.body.id_car);

      let getUserData = req.body.id_user;
      await this.userMiddleware.getUserById(getUserData);
      getUserData = await this.userService.getUserById(req.body.id_user);

      await this.reserveMiddleware.updateReserve(
        req.params.reserveId,
        req.body,
        getCarData,
        getUserData,
      );

      const reserve = await this.reserveService.createReserve(req.body);
      res.status(201).json(reserve);
    } catch (error: any) {
      res.status(error.code).json(AppErrorToJSON(error));
    }
  };

  public deleteReserve = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.reserveMiddleware.deleteReserve(req.params.reserveId);

      await this.reserveService.deleteReserve(req.params.reserveId);
      res.status(204).json({ message: '' });
    } catch (error: any) {
      res.status(error.code || 400).json(AppErrorToJSON(error));
    }
  };
}
