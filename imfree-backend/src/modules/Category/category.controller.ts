import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CategoryService } from './category.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard.js';

@ApiTags('Categories - Danh mục thiết bị')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ danh mục thiết bị (Máy ảnh, Laptop, Linh kiện IoT...)' })
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      message: 'Lấy danh sách danh mục thành công',
      data: categories,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Xem chi tiết 1 danh mục' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.findOne(id);
    return {
      message: 'Lấy chi tiết danh mục thành công',
      data: category,
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo danh mục mới (Cần đăng nhập)' })
  async create(@Body() dto: CreateCategoryDto) {
    const category = await this.categoryService.create(dto);
    return {
      message: 'Tạo danh mục mới thành công',
      data: category,
    };
  }
}
