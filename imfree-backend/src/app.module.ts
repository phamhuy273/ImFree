import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule'; 
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './modules/Auth/auth.module.js';
import { CategoryModule } from './modules/Category/category.module.js';
import { ListingModule } from './modules/Listing/listing.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(), 
    DatabaseModule,
    AuthModule,
    CategoryModule,
    ListingModule,
  ],
})
export class AppModule {}