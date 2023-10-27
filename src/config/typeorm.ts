import { registerAs } from '@nestjs/config';
import {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  DATABASE_USER,
} from '../utils/env';
import { DataSource, DataSourceOptions } from 'typeorm';

const config = {
  type: 'mysql',
  host: `${DATABASE_HOST}`,
  port: `${DATABASE_PORT}`,
  username: `${DATABASE_USER}`,
  password: `${DATABASE_PASSWORD}`,
  database: `${DATABASE_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/**/migrations/*{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
