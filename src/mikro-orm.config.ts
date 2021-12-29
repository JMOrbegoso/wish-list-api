import { Options as MikroOrmOptions } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { MongoDriver } from '@mikro-orm/mongodb';
import { Logger } from '@nestjs/common';
import config from './config';

const logger = new Logger('MikroORM');

const mikroOrmConfig: MikroOrmOptions<MongoDriver> = {
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  highlighter: new MongoHighlighter(),
  logger: logger.log.bind(logger),
  type: 'mongo',
  dbName: config.DB_DATABASE,
  clientUrl: `mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}`,
  ensureIndexes: true,
};
export default mikroOrmConfig;
