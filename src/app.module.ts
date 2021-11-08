import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './users/infrastructure/presentation/accounts.module';

@Module({
  imports: [MikroOrmModule.forRoot(), AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
