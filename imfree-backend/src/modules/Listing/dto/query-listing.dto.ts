import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';
import { CampusZone } from './create-listing.dto.js';

export class QueryListingDto {
  @ApiPropertyOptional({ example: 'Sony', description: 'Từ khóa tìm kiếm theo tên thiết bị hoặc mô tả' })
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiPropertyOptional({ example: 1, description: 'Lọc theo ID danh mục thiết bị' })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({ enum: CampusZone, description: 'Lọc theo khu vực trường/KTX' })
  @IsEnum(CampusZone)
  @IsOptional()
  campusZone?: CampusZone;

  @ApiPropertyOptional({ example: 1, default: 1, description: 'Số trang (page)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10, description: 'Số bài đăng mỗi trang (limit)' })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 10;
}
