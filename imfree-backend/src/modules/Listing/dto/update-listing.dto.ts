import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { CreateListingDto } from './create-listing.dto.js';

export enum ListingStatus {
  AVAILABLE = 'AVAILABLE',
  BUSY = 'BUSY',
  HIDDEN = 'HIDDEN',
}

export class UpdateListingDto extends PartialType(CreateListingDto) {
  @ApiProperty({
    enum: ListingStatus,
    example: ListingStatus.AVAILABLE,
    description: 'Trạng thái hiển thị của bài đăng (AVAILABLE, BUSY, HIDDEN)',
    required: false,
  })
  @IsEnum(ListingStatus, { message: 'Trạng thái không hợp lệ' })
  @IsOptional()
  status?: ListingStatus;
}
