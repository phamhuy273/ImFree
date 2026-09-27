import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtStrategy } from './stratergies/jwt.stratergy.js';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'default_secret',
        signOptions: { 
          expiresIn: '7d',
        },
      }),
    }),
  ],
  controllers: [AuthController],           // Đăng ký cửa tiếp nhận
  providers: [AuthService, JwtStrategy],    // Đăng ký các dịch vụ xử lý logic
  exports: [AuthService],                  // Cho phép các module khác dùng chung nếu cần
})
export class AuthModule {}