import { 
  Body, 
  Controller, 
  Post, 
  Get, 
  UseGuards, 
  Req 
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiBearerAuth 
} from '@nestjs/swagger';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@ApiTags('Auth - Xác thực người dùng') 
@Controller('auth')                  
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 1. API ĐĂNG KÝ
  @Post('register')
  @ApiOperation({ summary: 'Đăng ký tài khoản sinh viên mới' })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // 2. API ĐĂNG NHẬP
  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập vào hệ thống' })
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // 3. API LẤY THÔNG TIN CÁ NHÂN (YÊU CẦU TOKEN)
  @Get('me')
  @UseGuards(JwtAuthGuard) 
  @ApiBearerAuth()        
  @ApiOperation({ summary: 'Xem thông tin tài khoản hiện tại (cần Token)' })
  async getProfile(@Req() req: any) {
    return {
      message: 'Lấy thông tin tài khoản thành công',
      user: req.user,
    };
  }
}