import { ApiProperty, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Min, Matches, IsEmail } from 'class-validator';
import { Deserializer } from 'v8';

export class RegisterDto{
    
    @ApiProperty({example:"Pham Huy", description: "Ho va ten"})
    @IsString()
    @IsNotEmpty({message: "Họ và tên không được trống"})
    full_name: String;


    @ApiProperty({example:"abc@gmail.com", description:"Email"})
    @IsEmail()
    @Matches(/\.edu\.vn$/, { message: 'Phải dùng emai edu' })
    @IsNotEmpty({message:"Email không được trống"})
    email: String;

    @ApiProperty({example:"0987654321", description:"Số điện thoại"})
    @IsString()
    @IsNotEmpty()
    @Matches(/^(0[3|5|7|8|9])[0-9]{8}$/,{message:"Định dạng số diện thoại chưa đúng"})
    phone_number: String;

    @ApiProperty({example:"abcd123", description: "Mật khẩu"})
    @IsNotEmpty()
    password_hash: String;

    @ApiProperty({example:"http/abccom", description:" link cloudinary"})
    @IsString()
    @IsNotEmpty()
    avatar_Url: String;

    
}