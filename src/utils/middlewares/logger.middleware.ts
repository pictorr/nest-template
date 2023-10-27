import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { logger } from '../logger';
import { Format, cyan, green, red } from 'cli-color';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = process.hrtime();

    response.on('close', () => {
      const { statusCode } = response;
      const endTime = process.hrtime(startTime);
      const responseTime = endTime[0] * 1000 + endTime[1] / 1000000; // in milliseconds

      let colorizer: Format;
      if (statusCode >= 200 && statusCode < 300) {
        colorizer = green;
      } else if (statusCode >= 300 && statusCode < 400) {
        colorizer = cyan;
      } else {
        colorizer = red;
      }
      const coloredStatusCode = colorizer(statusCode.toString());
      logger.log(
        `${method} ${url} ${coloredStatusCode} - ${responseTime}ms ${userAgent} ${ip}`,
      );
    });
    next();
  }
}
