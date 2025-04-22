import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  interface Request {
    accountId: string;
  }
}

@Injectable()
export class AccountMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const accountId = req.headers['x-account-id'] as string;
    if (!accountId)
      throw new UnauthorizedException('x-account-id header missing');
    req.accountId = accountId;
    next();
  }
}
