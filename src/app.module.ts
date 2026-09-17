import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [UsersModule, ConfigModule.forRoot({isGlobal:true}), MongooseModule.forRoot(process.env.MONGO_URI!), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
