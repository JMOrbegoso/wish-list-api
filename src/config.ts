import path from 'path';
import dotenv from 'dotenv';

const envFileName = process.env.NODE_ENV
  ? `.${process.env.NODE_ENV}.env`
  : `.env`;

dotenv.config({
  path: path.resolve(__dirname, `../${envFileName}`),
});

export default {
  SERVER_PORT: process.env.SERVER_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_PORT: parseInt(process.env.DB_PORT),
  JWT_KEY: process.env.JWT_KEY,
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_SERVICE: process.env.EMAIL_SERVICE,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
};
