import { join } from 'path';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AuthModule } from './users/infrastructure/presentation/auth.module';
import { UsersModule } from './users/infrastructure/presentation/users.module';
import { WishesModule } from './wishes/infrastructure/presentation/wishes.module';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
    UsersModule,
    WishesModule,
  ],
})
export class AppModule {}
