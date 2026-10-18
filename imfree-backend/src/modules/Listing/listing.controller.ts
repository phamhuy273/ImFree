import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ListingService } from './listing.service.js';
import { CreateListingDto } from './dto/create-listing.dto.js';
import { UpdateListingDto } from './dto/update-listing.dto.js';
import { QueryListingDto } from './dto/query-listing.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@ApiTags('Listings - Đăng tin & Thuê thiết bị')
@Controller('listings')
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  // 1. ĐĂNG BÀI CHO THUÊ ĐỒ MỚI (YÊU CẦU ĐĂNG NHẬP)
  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Chủ đồ đăng bài cho thuê thiết bị mới (cần Token)' })
  async create(@Req() req: any, @Body() dto: CreateListingDto) {
    const userId = req.user.id;
    return this.listingService.create(userId, dto);
  }

  // 2. XEM DANH SÁCH BÀI ĐĂNG (CÓ TÌM KIẾM, LỌC VÀ PHÂN TRANG)
  @Get()
  @ApiOperation({
    summary: 'Xem danh sách thiết bị cho thuê (Lọc theo danh mục, khu vực KTX/UIT, từ khóa)',
  })
  async findAll(@Query() query: QueryListingDto) {
    return this.listingService.findAll(query);
  }

  // 3. XEM CHI TIẾT 1 THIẾT BỊ
  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết 1 bài đăng thiết bị theo ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.listingService.findOne(id);
  }

  // 4. CHỦ ĐỒ CẬP NHẬT THÔNG TIN / TRẠNG THÁI BÀI ĐĂNG (CẦN ĐĂNG NHẬP)
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Chỉnh sửa bài đăng thiết bị (chỉ chủ sở hữu)' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: any,
    @Body() dto: UpdateListingDto,
  ) {
    const userId = req.user.id;
    return this.listingService.update(id, userId, dto);
  }

  // 5. CHỦ ĐỒ ẨN / XÓA BÀI ĐĂNG KHỎI SÀN (CẦN ĐĂNG NHẬP)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ẩn bài đăng khỏi sàn (chỉ chủ sở hữu)' })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.listingService.remove(id, userId);
  }
}
