import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../../database/database.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  // ==========================================
  // 1. CHỨC NĂNG ĐĂNG KÝ
  // ==========================================
  async register(dto: RegisterDto) {
    // Kiem tra email da ton tai chua
    const existingUser = await this.db.client.orm.public.User
      .where({ email: dto.email })
      .first();
    if (existingUser) {
      throw new ConflictException('Email này đã được đăng ký tài khoản');
    }
    // Ma hoa mat khau
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltRounds);

    // Tạo bản ghi user mới vào Database
    const newUser = await this.db.client.orm.public.User.create({
      email: dto.email,
      password_hash: hashedPassword,
      full_name: dto.full_name,
      phone_number: dto.phone_number,
      avatar_url: dto.avatar_url ?? null,
      role: 'STUDENT',
    });

    // Tạo JWT Token
    const token = await this.generateToken(newUser.id, newUser.email);

    // Bóc tách loại bỏ password_hash trước khi trả về Client
    const { password_hash, ...userSafeData } = newUser;

    return {
      message: 'Đăng ký tài khoản thành công',
      user: userSafeData,
      access_token: token,
    };
  }

  // ==========================================
  // 2. CHỨC NĂNG ĐĂNG NHẬP
  // ==========================================
  async login(dto: LoginDto) {
    //  Tìm tài khoản theo email
    const user = await this.db.client.orm.public.User
      .where({ email: dto.email })
      .first();

    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }
    const isPasswordValid = await bcrypt.compare(dto.password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không chính xác');
    }

    // Tạo JWT Token
    const token = await this.generateToken(user.id, user.email);

    // Trả về kết quả an toàn
    const { password_hash, ...userSafeData } = user;

    return {
      message: 'Đăng nhập thành công',
      user: userSafeData,
      access_token: token,
    };
  }

  // ==========================================
  // Ký mã JWT Token
  // ==========================================
  private async generateToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email };
    return this.jwtService.signAsync(payload);
  }
}