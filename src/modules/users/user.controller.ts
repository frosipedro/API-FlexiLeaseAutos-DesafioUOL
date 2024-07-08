import { Request, Response } from 'express';
import { UserService } from '../users/user.service';
import { UserMiddleware } from '../users/user.middleware';

export class UserController {
  private userService: UserService;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.userService = new UserService();
    this.userMiddleware = new UserMiddleware();
  }

  public createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const formatedCEP = await this.userMiddleware.formatCEP(req.body);
      await this.userMiddleware.createUser(formatedCEP);

      const user = await this.userService.createUser(formatedCEP);
      res.status(201).json({ user });
    } catch (error: any) {
      res.status(error.code).json(error.AppErrorToJSON());
    }
  };

  public getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { query, page, limit } = req.query;
      const pageNumber = page ? parseInt(page as string, 10) : undefined;
      const limitNumber = limit ? parseInt(limit as string, 10) : undefined;

      const users = await this.userService.getUsers(
        query,
        pageNumber,
        limitNumber,
      );
      res.status(200).json({ users });
    } catch (error: any) {
      res.status(error.code || 400).json(error.AppErrorToJSON());
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userMiddleware.deleteUser(req.params.userId);

      await this.userService.deleteUser(req.params.userId);
      res.status(204).json({ message: '' });
    } catch (error: any) {
      res.status(error.code || 400).json(error.AppErrorToJSON());
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userMiddleware.updateUser(req.params.userId, req.body);

      const user = await this.userService.updateUser(
        req.params.userId,
        req.body,
      );
      res.status(200).json({ user });
    } catch (error: any) {
      res.status(error.code || 400).json(error.AppErrorToJSON());
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.userMiddleware.getUserById(req.params.userId);

      const user = await this.userService.getUserById(req.params.userId);
      res.status(200).json({ user });
    } catch (error: any) {
      res.status(error.code || 400).json(error.AppErrorToJSON());
    }
  };
}
