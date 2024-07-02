import { request, response } from 'express';
import { UserService } from '../services/user.service';
import { UserMiddleware } from '../middlewares/user.middleware';

export class UserController {
  private userService: UserService;
  private userMiddleware: UserMiddleware;

  constructor() {
    this.userService = new UserService();
    this.userMiddleware = new UserMiddleware();
  }

  public createUser = async (
    req: request,
    res: response,
  ): Promise<response> => {
    try {
      const formatedCEP = await this.userMiddleware.formatCEP(req.body);
      const verifyUser = await this.userMiddleware.createUser(formatedCEP);
      if (verifyUser) {
        return res.status(400).json(verifyUser);
      }

      const user = await this.userService.createUser(formatedCEP);
      res.status(201).json({ user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}
