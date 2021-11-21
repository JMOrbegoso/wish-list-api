import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/infrastructure/presentation/users.module';
import { AuthModule } from './users/infrastructure/presentation/auth.module';

@Module({
  imports: [MikroOrmModule.forRoot(), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
