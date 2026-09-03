# ImFree – Nền tảng chia sẻ nguồn lực nhàn rỗi dành cho sinh viên
> **Đề tài tham gia:** Advanced Information Systems Contest 2026 (AISC'26)  
> **Đơn vị:** Trường Đại học Công nghệ Thông tin – ĐHQG-HCM (UIT)  
> **Chủ đề:** Digital Business Ideas  

---

##  Giới thiệu dự án (Overview)
**ImFree** là nền tảng kinh tế chia sẻ ngang hàng (P2P Campus Sharing Economy) dành riêng cho cộng đồng sinh viên đại học, tập trung giải quyết bài toán lãng phí tài nguyên và rào cản chi phí thông qua 2 trụ cột:
1. **Asset Sharing (Cho thuê tài sản nhàn rỗi):** Máy ảnh, tripod, máy chiếu, laptop, thiết bị đồ án...
2. **Skill Sharing (Cung cấp kỹ năng & dịch vụ):** Thiết kế slide/poster, chỉnh sửa video, lập trình, gia sư...

Nền tảng được bảo vệ bởi **Hạ tầng niềm tin (Trust Infrastructure)** bao gồm: Xác thực sinh viên (Student KYC), Đặt cọc ký quỹ (Escrow), Đối chiếu hiện trạng tài sản bằng hình ảnh trước/sau bàn giao (Condition Inspection), và Hệ thống điểm uy tín đa vai trò (Trust Score).

---

## Công nghệ sử dụng (Tech Stack)
* **Mobile App:** Flutter (Cross-platform Android/iOS), BLoC State Management, Dio Networking.
* **Backend:** Node.js, NestJS (Modular Architecture, Swagger OpenAPI).
* **Database & ORM:** PostgreSQL 16, Prisma ORM.
* **Infrastructure & DevOps:** Docker, Docker Compose, GitHub Actions CI/CD.

---

## 📂 Cấu trúc Repository (Monorepo)
```text
ImFree/
├── .github/workflows/       # Quy trình CI/CD tự động kiểm tra code
├── docs/                    # Tài liệu phân tích, thiết kế hệ thống và bài thi
├── deployment/              # Cấu hình Docker, Nginx triển khai server
├── imfree-backend/          # Mã nguồn máy chủ NestJS & Prisma
├── imfree-mobile/           # Mã nguồn ứng dụng Flutter
└── docker-compose.yml       # Khởi động PostgreSQL Database local