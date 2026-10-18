import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { DatabaseService } from '../../database/database.service.js';
import { CreateListingDto } from './dto/create-listing.dto.js';
import { UpdateListingDto } from './dto/update-listing.dto.js';
import { QueryListingDto } from './dto/query-listing.dto.js';

@Injectable()
export class ListingService {
  constructor(private readonly db: DatabaseService) {}

  // 1. ĐĂNG BÀI CHO THUÊ THIẾT BỊ MỚI
  async create(userId: number, dto: CreateListingDto) {
    // Kiểm tra danh mục thiết bị có tồn tại không
    const category = await this.db.client.orm.public.Category
      .where({ id: dto.category_id })
      .first();

    if (!category) {
      throw new BadRequestException('Danh mục thiết bị không tồn tại');
    }

    const listing = await this.db.client.orm.public.Listing.create({
      title: dto.title,
      description: dto.description,
      price_per_day: dto.price_per_day,
      deposit_amount: dto.deposit_amount,
      images: dto.images,
      campus_zone: dto.campus_zone,
      location_note: dto.location_note ?? null,
      status: 'AVAILABLE',
      providerId: userId,
      categoryId: dto.category_id,
    });

    return {
      message: 'Đăng tin cho thuê thiết bị thành công',
      data: listing,
    };
  }

  // 2. LẤY DANH SÁCH BÀI ĐĂNG (TÌM KIẾM, LỌC THEO KHU VỰC/DANH MỤC, PHÂN TRANG)
  async findAll(query: QueryListingDto) {
    const { keyword, categoryId, campusZone, page = 1, limit = 10 } = query;

    // Lấy tất cả bài đăng
    const rawListings = await this.db.client.orm.public.Listing.all();

    // Chỉ lấy bài đăng có trạng thái AVAILABLE
    let allListings = (rawListings as any[]).filter((item: any) => item.status === 'AVAILABLE');

    // Lọc theo Danh mục
    if (categoryId) {
      allListings = allListings.filter((item: any) => item.categoryId === Number(categoryId));
    }

    // Lọc theo Khu vực khuôn viên trường/KTX
    if (campusZone) {
      allListings = allListings.filter((item: any) => item.campus_zone === campusZone);
    }

    // Tìm kiếm theo từ khóa (tiêu đề hoặc mô tả)
    if (keyword && keyword.trim()) {
      const lower = keyword.trim().toLowerCase();
      allListings = allListings.filter(
        (item: any) =>
          item.title.toLowerCase().includes(lower) ||
          item.description.toLowerCase().includes(lower),
      );
    }

    const total = allListings.length;
    const startIndex = (Number(page) - 1) * Number(limit);
    const paginatedListings = allListings.slice(startIndex, startIndex + Number(limit));

    // Bổ sung thông tin chi tiết của Category và Chủ đồ (Provider)
    const enrichedData = await Promise.all(
      paginatedListings.map(async (listing: any) => {
        const provider = await this.db.client.orm.public.User
          .where({ id: listing.providerId })
          .first();

        const category = await this.db.client.orm.public.Category
          .where({ id: listing.categoryId })
          .first();

        return {
          ...listing,
          provider: provider
            ? {
                id: provider.id,
                full_name: provider.full_name,
                phone_number: provider.phone_number,
                avatar_url: provider.avatar_url,
              }
            : null,
          category: category
            ? {
                id: category.id,
                name: category.name,
                slug: category.slug,
              }
            : null,
        };
      }),
    );

    return {
      message: 'Lấy danh sách bài đăng thành công',
      data: enrichedData,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit)),
      },
    };
  }

  // 3. XEM CHI TIẾT 1 BÀI ĐĂNG
  async findOne(id: number) {
    const listing = await this.db.client.orm.public.Listing
      .where({ id })
      .first();

    if (!listing || listing.status === 'HIDDEN') {
      throw new NotFoundException('Không tìm thấy bài đăng thiết bị này');
    }

    const provider = await this.db.client.orm.public.User
      .where({ id: listing.providerId })
      .first();

    const category = await this.db.client.orm.public.Category
      .where({ id: listing.categoryId })
      .first();

    return {
      message: 'Lấy chi tiết thiết bị thành công',
      data: {
        ...listing,
        provider: provider
          ? {
              id: provider.id,
              full_name: provider.full_name,
              phone_number: provider.phone_number,
              avatar_url: provider.avatar_url,
            }
          : null,
        category: category
          ? {
              id: category.id,
              name: category.name,
              slug: category.slug,
            }
          : null,
      },
    };
  }

  // 4. CHỦ ĐỒ CẬP NHẬT BÀI ĐĂNG
  async update(id: number, userId: number, dto: UpdateListingDto) {
    const listing = await this.db.client.orm.public.Listing
      .where({ id })
      .first();

    if (!listing) {
      throw new NotFoundException('Không tìm thấy bài đăng thiết bị');
    }

    // Bảo đảm chỉ chủ sở hữu bài đăng mới có quyền sửa
    if (listing.providerId !== userId) {
      throw new ForbiddenException('Bạn không có quyền chỉnh sửa bài đăng của người khác');
    }

    if (dto.category_id) {
      const category = await this.db.client.orm.public.Category
        .where({ id: dto.category_id })
        .first();

      if (!category) {
        throw new BadRequestException('Danh mục thiết bị không tồn tại');
      }
    }

    const updated = await this.db.client.orm.public.Listing
      .where({ id })
      .update({
        ...(dto.title && { title: dto.title }),
        ...(dto.description && { description: dto.description }),
        ...(dto.price_per_day !== undefined && { price_per_day: dto.price_per_day }),
        ...(dto.deposit_amount !== undefined && { deposit_amount: dto.deposit_amount }),
        ...(dto.images && { images: dto.images }),
        ...(dto.campus_zone && { campus_zone: dto.campus_zone }),
        ...(dto.location_note !== undefined && { location_note: dto.location_note }),
        ...(dto.status && { status: dto.status }),
        ...(dto.category_id && { categoryId: dto.category_id }),
      });

    return {
      message: 'Cập nhật bài đăng thành công',
      data: updated,
    };
  }

  // 5. ẨN / XÓA BÀI ĐĂNG (SOFT DELETE)
  async remove(id: number, userId: number) {
    const listing = await this.db.client.orm.public.Listing
      .where({ id })
      .first();

    if (!listing) {
      throw new NotFoundException('Không tìm thấy bài đăng thiết bị');
    }

    if (listing.providerId !== userId) {
      throw new ForbiddenException('Bạn không có quyền ẩn bài đăng này');
    }

    await this.db.client.orm.public.Listing
      .where({ id })
      .update({ status: 'HIDDEN' });

    return {
      message: 'Đã ẩn bài đăng thành công khỏi sàn',
    };
  }
}
