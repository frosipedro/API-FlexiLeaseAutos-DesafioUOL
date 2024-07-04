import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface AuthRequest extends Request {
  userId?: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({ error: 'No token provided' });
    return;
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    res.status(401).send({ error: 'Token error' });
    return;
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).send({ error: 'Token malformatted' });
    return;
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      res.status(401).send({ error: 'Token invalid' });
      return;
    }

    req.userId = (decoded as JwtPayload).id;
    next();
  });
};

export default authMiddleware;
