import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';

@Module({
  imports: [
    // 1. Cấu hình đọc file .env toàn hệ thống
    ConfigModule.forRoot({ isGlobal: true }),
    // 2. Kết nối Database rỗng
    DatabaseModule,
  ],
})
export class AppModule {}