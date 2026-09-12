import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({isGlobal:true}), MongooseModule.forRoot(process.env.MONGO_URI!)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
