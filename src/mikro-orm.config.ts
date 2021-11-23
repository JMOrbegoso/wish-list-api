import { Options as MikroOrmOptions } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { Logger } from '@nestjs/common';

const logger = new Logger('MikroORM');

const mikroOrmConfig: MikroOrmOptions = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  highlighter: new MongoHighlighter(),
  logger: logger.log.bind(logger),
  type: 'mongo',
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
  ensureIndexes: true,
};

export default mikroOrmConfig;
