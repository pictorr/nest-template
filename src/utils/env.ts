import { config } from 'dotenv';
import { cleanEnv, port, str } from 'envalid';

config();

export const {
  NODE_ENV,
  PORT,
  API_URL,
  LOG_DIR,
  LOG_FORMAT,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} = cleanEnv(process.env, {
  NODE_ENV: str(),
  PORT: port(),
  API_URL: str(),
  LOG_FORMAT: str(),
  LOG_DIR: str(),
  DATABASE_HOST: str(),
  DATABASE_PORT: port(),
  DATABASE_USER: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_NAME: str(),
});
