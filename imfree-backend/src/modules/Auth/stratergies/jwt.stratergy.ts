import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { DatabaseService } from '../../../database/database.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly db: DatabaseService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'default_secret',
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const user = await this.db.client.orm.public.User
      .where({ id: payload.sub })
      .first();

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại hoặc Token hết hạn');
    }
    const { password_hash, ...userSafeData } = user;
    return userSafeData;
  }
}