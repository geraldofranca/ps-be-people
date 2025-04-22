import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './application/modules/person.module';
import { AccountMiddleware } from './presentation/middlewares/account.middleware';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AccountMiddleware).forRoutes('*');
  }
}
