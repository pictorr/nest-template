import * as winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from './env';
import { join } from 'path';
import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

const logDir: string = join(__dirname, LOG_DIR);

const logFormat = format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

const logger = WinstonModule.createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    new winstonDaily({
      level: 'debug',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/debug',
      filename: `%DATE%.log`,
      maxFiles: 30,
      json: false,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: logDir + '/error',
      filename: `%DATE%.log`,
      maxFiles: 30,
      handleExceptions: true,
      json: false,
      zippedArchive: true,
    }),
    new transports.Console({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize(),
        logFormat,
      ),
    }),
  ],
});

export { logger };
