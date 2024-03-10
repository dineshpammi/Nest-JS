import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomersModule } from './customers/customers.module';
import { TodosModule } from './todos/todo.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/crud'), CustomersModule, TodosModule, AuthModule,
  ConfigModule.forRoot({
    isGlobal: true, // Make ConfigModule available globally
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes('*')
    // {path:"/add any path",method:RequestMethod.GET}   -- specify the paths that use middleware 
  }
}
