import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export enum CampusZone {
  UIT_CAMPUS = 'UIT_CAMPUS',
  KTX_KHU_A = 'KTX_KHU_A',
  KTX_KHU_B = 'KTX_KHU_B',
  OTHER = 'OTHER',
}

export class CreateListingDto {
  @ApiProperty({
    example: 'Máy ảnh Sony A6400 kèm lens kit 16-50mm',
    description: 'Tiêu đề bài đăng cho thuê',
  })
  @IsString()
  @IsNotEmpty({ message: 'Tiêu đề bài đăng không được để trống' })
  @MinLength(5, { message: 'Tiêu đề tối thiểu phải từ 5 ký tự' })
  title: string;

  @ApiProperty({
    example: 'Máy ảnh còn rất mới, hoạt động hoàn hảo, thích hợp chụp sự kiện hoặc kỷ yếu sinh viên UIT.',
    description: 'Mô tả chi tiết tình trạng thiết bị và phụ kiện đi kèm',
  })
  @IsString()
  @IsNotEmpty({ message: 'Mô tả thiết bị không được để trống' })
  description: string;

  @ApiProperty({ example: 1, description: 'ID danh mục thiết bị' })
  @IsInt({ message: 'ID danh mục phải là số nguyên' })
  @IsPositive({ message: 'ID danh mục không hợp lệ' })
  category_id: number;

  @ApiProperty({ example: 150000, description: 'Giá thuê theo ngày (VNĐ)' })
  @IsNumber({}, { message: 'Giá thuê phải là số' })
  @Min(0, { message: 'Giá thuê không được âm' })
  price_per_day: number;

  @ApiProperty({
    example: 1500000,
    description: 'Số tiền ký quỹ (tiền cọc) yêu cầu (VNĐ)',
  })
  @IsNumber({}, { message: 'Tiền cọc phải là số' })
  @Min(0, { message: 'Tiền cọc không được âm' })
  deposit_amount: number;

  @ApiProperty({
    example: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
      'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac',
    ],
    description: 'Danh sách các link ảnh chụp thực tế của thiết bị',
  })
  @IsArray({ message: 'Danh sách ảnh phải là một mảng' })
  @IsString({ each: true, message: 'Mỗi link ảnh phải là chuỗi ký tự' })
  images: string[];

  @ApiProperty({
    enum: CampusZone,
    example: CampusZone.UIT_CAMPUS,
    description: 'Khu vực giao nhận trong khu vực UIT / KTX ĐHQG-HCM',
  })
  @IsEnum(CampusZone, {
    message: 'Khu vực phải thuộc một trong các giá trị: UIT_CAMPUS, KTX_KHU_A, KTX_KHU_B, OTHER',
  })
  campus_zone: CampusZone;

  @ApiProperty({
    example: 'Hẹn gặp giao máy ở sảnh nhà C hoặc ghế đá nhà A trường UIT',
    description: 'Ghi chú địa điểm giao nhận cụ thể',
    required: false,
  })
  @IsString()
  @IsOptional()
  location_note?: string;
}
