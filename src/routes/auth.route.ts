import { Router, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import User from '../modules/users/user.model';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ error: 'Email and password are required' });
    return;
  }

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).send({ error: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user._id }, 'your_secret_key', {
      expiresIn: '12h',
    });

    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Internal server error' });
  }
});

export default router;
