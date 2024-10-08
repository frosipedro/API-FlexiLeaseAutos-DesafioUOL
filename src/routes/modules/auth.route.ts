import AppError from '../../utils/AppError';
import * as jwt from 'jsonwebtoken';
import { Router, Request, Response } from 'express';
import User from '../../modules/users/user.model';
import { AppErrorToJSON } from '../../utils/AppError';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new AppError(400, 'Email and password are required');
    res.status(400).send(AppErrorToJSON(error));
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      const error = new AppError(400, 'Invalid email or password');
      res.status(400).send(AppErrorToJSON(error));
      return;
    }

    const token = jwt.sign({ id: user._id }, 'your_secret_key', {
      expiresIn: '12h',
    });

    res.send({ token });
  } catch (error) {
    const errorFormated = new AppError(500, 'Internal server error');
    res.status(500).send(errorFormated);
  }
});

export default router;
