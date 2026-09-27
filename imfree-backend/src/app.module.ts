import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule'; 
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './modules/Auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(), 
    DatabaseModule,
    AuthModule,
  ],
})
export class AppModule {}