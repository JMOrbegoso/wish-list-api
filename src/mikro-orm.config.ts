import { Options as MikroOrmOptions } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { Logger } from '@nestjs/common';
import config from './config';

const logger = new Logger('MikroORM');

const mikroOrmConfig: MikroOrmOptions = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  highlighter: new MongoHighlighter(),
  logger: logger.log.bind(logger),
  type: 'mongo',
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  dbName: config.DB_DATABASE,
  port: config.DB_PORT,
  ensureIndexes: true,
};

export default mikroOrmConfig;
