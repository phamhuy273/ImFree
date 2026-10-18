import { Injectable, ConflictException, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';

@Injectable()
export class CategoryService implements OnModuleInit {
  constructor(private readonly db: DatabaseService) {}

  async onModuleInit() {
    // Tự động khởi tạo danh mục thiết bị mẫu cho sinh viên UIT khi server khởi động
    try {
      await this.seedDefaultCategories();
    } catch {
      // Bỏ qua nếu DB chưa sẵn sàng kết nối lúc khởi động
    }
  }

  async findAll() {
    return this.db.client.orm.public.Category.all();
  }

  async findOne(id: number) {
    return this.db.client.orm.public.Category
      .where({ id })
      .first();
  }

  async create(dto: CreateCategoryDto) {
    const existing = await this.db.client.orm.public.Category
      .where({ slug: dto.slug })
      .first();

    if (existing) {
      throw new ConflictException('Slug danh mục này đã tồn tại');
    }

    return this.db.client.orm.public.Category.create({
      name: dto.name,
      slug: dto.slug,
      icon_url: dto.icon_url ?? null,
    });
  }

  async seedDefaultCategories() {
    const existingCategories = await this.db.client.orm.public.Category.all();
    if (existingCategories.length > 0) return;

    const defaultCategories = [
      {
        name: 'Máy ảnh & Phụ kiện Media',
        slug: 'may-anh-media',
        icon_url: 'https://cdn-icons-png.flaticon.com/512/2983/2983067.png',
      },
      {
        name: 'Laptop & Thiết bị CNTT',
        slug: 'laptop-thiet-bi-cntt',
        icon_url: 'https://cdn-icons-png.flaticon.com/512/428/428001.png',
      },
      {
        name: 'Linh kiện IoT, Vi điều khiển & Mạch nhúng',
        slug: 'linh-kien-iot-nhung',
        icon_url: 'https://cdn-icons-png.flaticon.com/512/3655/3655585.png',
      },
      {
        name: 'Dụng cụ Học tập & Trình chiếu',
        slug: 'dung-cu-hoc-tap-trinh-chieu',
        icon_url: 'https://cdn-icons-png.flaticon.com/512/3135/3135755.png',
      },
      {
        name: 'Đồ Sự kiện, Thể thao & Đoàn Hội',
        slug: 'su-kien-the-thao',
        icon_url: 'https://cdn-icons-png.flaticon.com/512/857/857418.png',
      },
    ];

    for (const cat of defaultCategories) {
      await this.db.client.orm.public.Category.create(cat);
    }
  }
}
