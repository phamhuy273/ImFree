import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Máy ảnh & Phụ kiện Media', description: 'Tên danh mục thiết bị' })
  @IsString()
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  name: string;

  @ApiProperty({ example: 'may-anh-media', description: 'Slug định danh URL' })
  @IsString()
  @IsNotEmpty({ message: 'Slug không được để trống' })
  slug: string;

  @ApiProperty({
    example: 'https://cdn-icons-png.flaticon.com/512/2983/2983067.png',
    description: 'Icon đại diện danh mục',
    required: false,
  })
  @IsString()
  @IsOptional()
  icon_url?: string;
}
