import { ApiProperty } from '@nestjs/swagger';
import { 
  IsEmail, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  Matches, 
  MinLength 
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Phạm Huy', description: 'Họ và tên sinh viên UIT' })
  @IsString()
  @IsNotEmpty({ message: 'Họ và tên không được để trống' })
  full_name: string;

  @ApiProperty({ example: '21520000@uit.edu.vn', description: 'Email trường UIT (@uit.edu.vn)' })
  @IsEmail({}, { message: 'Định dạng email không hợp lệ' })
  @Matches(/@uit\.edu\.vn$/, { message: 'Giai đoạn thử nghiệm chỉ hỗ trợ sinh viên UIT với email @uit.edu.vn' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  email: string;

  @ApiProperty({ example: '0987654321', description: 'Số điện thoại liên hệ' })
  @IsString()
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  @Matches(/^(0[3|5|7|8|9])[0-9]{8}$/, { message: 'Định dạng số điện thoại Việt Nam chưa đúng' })
  phone_number: string;

  @ApiProperty({ example: 'MatKhau123@', description: 'Mật khẩu (tối thiểu 6 ký tự)' })
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  @MinLength(6, { message: 'Mật khẩu phải có tối thiểu 6 ký tự' })
  password: string;

  @ApiProperty({ 
    example: 'https://res.cloudinary.com/demo/image/upload/sample.jpg', 
    description: 'Link ảnh đại diện (Cloudinary)',
    required: false 
  })
  @IsString()
  @IsOptional()
  avatar_url?: string;
}